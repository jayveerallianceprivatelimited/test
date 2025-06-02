import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  TooltipProps,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, ZoomIn, ZoomOut, RefreshCw, HelpCircle } from "lucide-react";

// Define variants for the chart card
const chartCardVariants = cva(
  "transition-all duration-200",
  {
    variants: {
      variant: {
        default: "",
        primary: "border-primary/20",
        success: "border-green-500/20",
        warning: "border-amber-500/20",
        danger: "border-red-500/20",
        info: "border-blue-500/20",
      },
      size: {
        sm: "h-[200px]",
        default: "h-[300px]",
        lg: "h-[400px]",
        xl: "h-[500px]",
        auto: "h-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Chart types
export type ChartType = "line" | "bar" | "area" | "pie" | "custom";

// Time range options
export type TimeRange = "day" | "week" | "month" | "quarter" | "year" | "all";

// Custom tooltip styles
const CustomTooltipStyle = ({ active, payload, label, ...props }: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-3 shadow-md">
        <p className="mb-1 font-medium">{label}</p>
        {payload.map((entry, index) => (
          <div key={`tooltip-${index}`} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <p className="text-sm">
              {entry.name}: {entry.value}
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export interface ChartCardProps extends VariantProps<typeof chartCardVariants> {
  title?: string;
  description?: string;
  data: any[];
  type?: ChartType;
  height?: number | string;
  width?: number | string;
  className?: string;
  isLoading?: boolean;
  showLegend?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  xAxisDataKey?: string;
  series?: {
    dataKey: string;
    name?: string;
    color?: string;
    type?: "monotone" | "linear" | "step" | "basis";
    strokeWidth?: number;
    fillOpacity?: number;
  }[];
  timeRanges?: TimeRange[];
  defaultTimeRange?: TimeRange;
  onTimeRangeChange?: (range: TimeRange) => void;
  renderChart?: (data: any[]) => ReactNode;
  allowDownload?: boolean;
  allowZoom?: boolean;
  allowRefresh?: boolean;
  onRefresh?: () => void;
  footer?: ReactNode;
  emptyState?: ReactNode;
}

export function ChartCard({
  title,
  description,
  data = [],
  type = "line",
  height,
  width = "100%",
  className,
  variant,
  size = "default",
  isLoading = false,
  showLegend = true,
  showGrid = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  xAxisDataKey = "name",
  series = [],
  timeRanges,
  defaultTimeRange,
  onTimeRangeChange,
  renderChart,
  allowDownload = false,
  allowZoom = false,
  allowRefresh = false,
  onRefresh,
  footer,
  emptyState,
}: ChartCardProps) {
  const [activeTimeRange, setActiveTimeRange] = React.useState<TimeRange>(defaultTimeRange || "month");
  const [zoomLevel, setZoomLevel] = React.useState(1);

  // Handle time range change
  const handleTimeRangeChange = (range: TimeRange) => {
    setActiveTimeRange(range);
    if (onTimeRangeChange) {
      onTimeRangeChange(range);
    }
  };

  // Handle zoom in/out
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  // Handle refresh
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  // Handle download
  const handleDownload = () => {
    // Create a CSV from the data
    const headers = Object.keys(data[0] || {}).join(",");
    const csvRows = data.map((row) => 
      Object.values(row).map((value) => 
        typeof value === "string" && value.includes(",") 
          ? `"${value}"` 
          : value
      ).join(",")
    );
    const csvContent = [headers, ...csvRows].join("\n");
    
    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${title || "chart"}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render loading state
  if (isLoading) {
    return (
      <Card className={cn(chartCardVariants({ variant, size }), className)}>
        {title && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent className="flex items-center justify-center">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="h-8 w-8 animate-spin-slow rounded-full border-4 border-muted-foreground/20 border-t-primary"></div>
            <p className="mt-2 text-sm text-muted-foreground">Loading chart data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render empty state
  if (!data.length) {
    return (
      <Card className={cn(chartCardVariants({ variant, size }), className)}>
        {title && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent className="flex items-center justify-center">
          {emptyState || (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <HelpCircle className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-2 text-center text-muted-foreground">No data available</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Render the chart based on type
  const renderChartContent = () => {
    if (renderChart) {
      return renderChart(data);
    }

    const commonProps = {
      data,
      margin: { top: 10, right: 30, left: 0, bottom: 0 },
    };

    const commonAxisProps = {
      tick: { fontSize: 12, fill: "var(--muted-foreground)" },
      tickLine: { stroke: "var(--border)" },
    };

    switch (type) {
      case "line":
        return (
          <ResponsiveContainer width={width} height={height || "100%"}>
            <LineChart {...commonProps}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />}
              {showXAxis && <XAxis dataKey={xAxisDataKey} {...commonAxisProps} />}
              {showYAxis && <YAxis {...commonAxisProps} />}
              {showTooltip && <Tooltip content={<CustomTooltipStyle />} />}
              {showLegend && <Legend wrapperStyle={{ fontSize: "12px" }} />}
              {series.map((s, index) => (
                <Line
                  key={`line-${index}`}
                  type={s.type || "monotone"}
                  dataKey={s.dataKey}
                  name={s.name || s.dataKey}
                  stroke={s.color || `hsl(${(index * 30) % 360}, 70%, 50%)`}
                  strokeWidth={s.strokeWidth || 2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case "bar":
        return (
          <ResponsiveContainer width={width} height={height || "100%"}>
            <BarChart {...commonProps}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />}
              {showXAxis && <XAxis dataKey={xAxisDataKey} {...commonAxisProps} />}
              {showYAxis && <YAxis {...commonAxisProps} />}
              {showTooltip && <Tooltip content={<CustomTooltipStyle />} />}
              {showLegend && <Legend wrapperStyle={{ fontSize: "12px" }} />}
              {series.map((s, index) => (
                <Bar
                  key={`bar-${index}`}
                  dataKey={s.dataKey}
                  name={s.name || s.dataKey}
                  fill={s.color || `hsl(${(index * 30) % 360}, 70%, 50%)`}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case "area":
        return (
          <ResponsiveContainer width={width} height={height || "100%"}>
            <AreaChart {...commonProps}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />}
              {showXAxis && <XAxis dataKey={xAxisDataKey} {...commonAxisProps} />}
              {showYAxis && <YAxis {...commonAxisProps} />}
              {showTooltip && <Tooltip content={<CustomTooltipStyle />} />}
              {showLegend && <Legend wrapperStyle={{ fontSize: "12px" }} />}
              {series.map((s, index) => (
                <Area
                  key={`area-${index}`}
                  type={s.type || "monotone"}
                  dataKey={s.dataKey}
                  name={s.name || s.dataKey}
                  stroke={s.color || `hsl(${(index * 30) % 360}, 70%, 50%)`}
                  fill={s.color || `hsl(${(index * 30) % 360}, 70%, 50%)`}
                  fillOpacity={s.fillOpacity || 0.2}
                  strokeWidth={s.strokeWidth || 2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );

      case "pie":
        const COLORS = series.map((s, index) => s.color || `hsl(${(index * 30) % 360}, 70%, 50%)`);
        return (
          <ResponsiveContainer width={width} height={height || "100%"}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey={series[0]?.dataKey || "value"}
                nameKey={xAxisDataKey}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              {showTooltip && <Tooltip content={<CustomTooltipStyle />} />}
              {showLegend && <Legend wrapperStyle={{ fontSize: "12px" }} />}
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Card 
      className={cn(
        chartCardVariants({ variant, size }),
        "overflow-hidden",
        className
      )}
      style={{ 
        transform: allowZoom ? `scale(${zoomLevel})` : undefined,
        transformOrigin: "center center",
        transition: "transform 0.3s ease"
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          {title && <CardTitle className="text-base font-medium">{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Time range selector */}
          {timeRanges && timeRanges.length > 0 && (
            <Tabs 
              defaultValue={activeTimeRange} 
              className="w-auto"
              onValueChange={(value) => handleTimeRangeChange(value as TimeRange)}
            >
              <TabsList className="grid h-8 grid-cols-3">
                {timeRanges.slice(0, 3).map((range) => (
                  <TabsTrigger 
                    key={range} 
                    value={range}
                    className="text-xs"
                  >
                    {range.charAt(0).toUpperCase() + range.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
          
          {/* Chart controls */}
          <div className="flex items-center space-x-1">
            {allowZoom && (
              <>
                <Button variant="ghost" size="icon-sm" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon-sm" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </>
            )}
            
            {allowRefresh && (
              <Button variant="ghost" size="icon-sm" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
            
            {allowDownload && (
              <Button variant="ghost" size="icon-sm" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-2 pb-0">
        <div className="h-full w-full pt-4">
          {renderChartContent()}
        </div>
      </CardContent>
      
      {footer && (
        <CardFooter className="justify-between pt-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

// Preset variants for common use cases
export function PrimaryChartCard(props: Omit<ChartCardProps, "variant">) {
  return <ChartCard variant="primary" {...props} />;
}

export function SuccessChartCard(props: Omit<ChartCardProps, "variant">) {
  return <ChartCard variant="success" {...props} />;
}

export function WarningChartCard(props: Omit<ChartCardProps, "variant">) {
  return <ChartCard variant="warning" {...props} />;
}

export function DangerChartCard(props: Omit<ChartCardProps, "variant">) {
  return <ChartCard variant="danger" {...props} />;
}

export function InfoChartCard(props: Omit<ChartCardProps, "variant">) {
  return <ChartCard variant="info" {...props} />;
}
