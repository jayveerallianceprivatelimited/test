import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatNumber, calculatePercentageChange } from "@/lib/utils";
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

// Define variants for the stat card
const statCardVariants = cva(
  "transition-all duration-200",
  {
    variants: {
      variant: {
        default: "",
        success: "border-green-500/20 dark:border-green-500/20",
        warning: "border-amber-500/20 dark:border-amber-500/20",
        danger: "border-red-500/20 dark:border-red-500/20",
        info: "border-blue-500/20 dark:border-blue-500/20",
      },
      size: {
        default: "",
        sm: "p-2",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Define variants for the trend indicator
const trendVariants = cva(
  "flex items-center text-xs font-medium",
  {
    variants: {
      trend: {
        up: "text-green-600 dark:text-green-500",
        down: "text-red-600 dark:text-red-500",
        neutral: "text-gray-600 dark:text-gray-400",
      },
    },
    defaultVariants: {
      trend: "neutral",
    },
  }
);

export interface StatCardProps extends VariantProps<typeof statCardVariants> {
  title: string;
  value: number | string;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    timeframe?: string;
  };
  valuePrefix?: string;
  valueSuffix?: string;
  previousValue?: number;
  isLoading?: boolean;
  className?: string;
  formatter?: (value: number) => string;
  iconBackground?: string;
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  valuePrefix = "",
  valueSuffix = "",
  previousValue,
  isLoading = false,
  className,
  variant,
  size,
  formatter = formatNumber,
  iconBackground,
  onClick,
}: StatCardProps) {
  // Determine trend direction
  const trendDirection = React.useMemo(() => {
    if (!trend) return "neutral";
    return trend.value > 0 ? "up" : trend.value < 0 ? "down" : "neutral";
  }, [trend]);

  // Format the displayed value
  const formattedValue = React.useMemo(() => {
    if (typeof value === "number") {
      return `${valuePrefix}${formatter(value)}${valueSuffix}`;
    }
    return `${valuePrefix}${value}${valueSuffix}`;
  }, [value, valuePrefix, valueSuffix, formatter]);

  // Calculate percentage change if previousValue is provided
  const percentageChange = React.useMemo(() => {
    if (previousValue !== undefined && typeof value === "number") {
      return calculatePercentageChange(previousValue, value);
    }
    return null;
  }, [previousValue, value]);

  // Render trend indicator
  const renderTrendIndicator = () => {
    if (!trend && percentageChange === null) return null;
    
    const trendValue = trend?.value || percentageChange || 0;
    const timeframe = trend?.timeframe || "";
    
    return (
      <div className={cn(trendVariants({ trend: trendDirection }))}>
        {trendDirection === "up" ? (
          <ArrowUpIcon className="mr-1 h-3 w-3" />
        ) : trendDirection === "down" ? (
          <ArrowDownIcon className="mr-1 h-3 w-3" />
        ) : (
          <MinusIcon className="mr-1 h-3 w-3" />
        )}
        <span>
          {Math.abs(trendValue).toFixed(1)}%{" "}
          {timeframe && <span className="text-muted-foreground">{timeframe}</span>}
        </span>
      </div>
    );
  };

  return (
    <Card 
      className={cn(
        statCardVariants({ variant, size }),
        "overflow-hidden hover:shadow-md",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {isLoading ? (
              <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
            ) : (
              <h3 className="text-2xl font-bold tracking-tight">{formattedValue}</h3>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {renderTrendIndicator()}
          </div>
          
          {icon && (
            <div 
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full",
                iconBackground || "bg-primary/10"
              )}
            >
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Preset variants for common use cases
export function SuccessStatCard(props: Omit<StatCardProps, "variant">) {
  return <StatCard variant="success" {...props} />;
}

export function WarningStatCard(props: Omit<StatCardProps, "variant">) {
  return <StatCard variant="warning" {...props} />;
}

export function DangerStatCard(props: Omit<StatCardProps, "variant">) {
  return <StatCard variant="danger" {...props} />;
}

export function InfoStatCard(props: Omit<StatCardProps, "variant">) {
  return <StatCard variant="info" {...props} />;
}
