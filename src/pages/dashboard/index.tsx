import React from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Head from "next/head";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/stat-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import ActivityFeed, { ActivityItem } from "@/components/dashboard/activity-feed";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  ArrowUpRight,
  BarChart3,
  CreditCard,
  DollarSign,
  Download,
  LineChart,
  Plus,
  RefreshCw,
  ShoppingCart,
  TrendingUp,
  Users,
  Activity,
  ArrowDown,
  ArrowUp,
  ArrowDownRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Calendar,
  Wallet,
  Inbox,
  Bell,
  ExternalLink,
} from "lucide-react";

// Mock data for the dashboard
const revenueData = [
  { name: "Jan", revenue: 4000, expenses: 2400, profit: 1600 },
  { name: "Feb", revenue: 5000, expenses: 2800, profit: 2200 },
  { name: "Mar", revenue: 6000, expenses: 3200, profit: 2800 },
  { name: "Apr", revenue: 7500, expenses: 3800, profit: 3700 },
  { name: "May", revenue: 9000, expenses: 4200, profit: 4800 },
  { name: "Jun", revenue: 10500, expenses: 4800, profit: 5700 },
  { name: "Jul", revenue: 11000, expenses: 5000, profit: 6000 },
  { name: "Aug", revenue: 12500, expenses: 5500, profit: 7000 },
  { name: "Sep", revenue: 14000, expenses: 6000, profit: 8000 },
  { name: "Oct", revenue: 15500, expenses: 6500, profit: 9000 },
  { name: "Nov", revenue: 16500, expenses: 7000, profit: 9500 },
  { name: "Dec", revenue: 18000, expenses: 7500, profit: 10500 },
];

const salesData = [
  { name: "00:00", sales: 120 },
  { name: "04:00", sales: 90 },
  { name: "08:00", sales: 150 },
  { name: "12:00", sales: 210 },
  { name: "16:00", sales: 250 },
  { name: "20:00", sales: 190 },
  { name: "24:00", sales: 140 },
];

const trafficSourceData = [
  { name: "Direct", value: 40 },
  { name: "Organic Search", value: 30 },
  { name: "Referral", value: 20 },
  { name: "Social Media", value: 10 },
];

const userActivityData = [
  { name: "Mon", active: 500, new: 120 },
  { name: "Tue", active: 520, new: 140 },
  { name: "Wed", active: 580, new: 160 },
  { name: "Thu", active: 650, new: 200 },
  { name: "Fri", active: 700, new: 220 },
  { name: "Sat", active: 600, new: 180 },
  { name: "Sun", active: 550, new: 160 },
];

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "login",
    title: "User Login Detected",
    description: "A new login was detected from a new device in San Francisco, CA.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    user: {
      id: "u1",
      name: "John Doe",
      avatar: "/avatar.png",
      role: "Admin",
    },
    read: false,
  },
  {
    id: "2",
    type: "create",
    title: "New Product Created",
    description: "A new product 'Premium Dashboard Kit' was added to the inventory.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    user: {
      id: "u2",
      name: "Sarah Johnson",
      avatar: "/avatar2.png",
      role: "Product Manager",
    },
    read: false,
    target: {
      id: "p1",
      name: "Premium Dashboard Kit",
      type: "Product",
      link: "/dashboard/products/premium-dashboard-kit",
    },
  },
  {
    id: "3",
    type: "update",
    title: "User Profile Updated",
    description: "User profile information was updated including contact details.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    user: {
      id: "u3",
      name: "Michael Brown",
      avatar: "/avatar3.png",
      role: "User",
    },
    read: true,
  },
  {
    id: "4",
    type: "notification",
    title: "System Maintenance",
    description: "Scheduled system maintenance will occur on Sunday at 2:00 AM UTC.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: true,
    status: "pending",
  },
  {
    id: "5",
    type: "warning",
    title: "Disk Space Warning",
    description: "Server is reaching 85% disk capacity. Consider cleaning up unused files.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    read: false,
    status: "in_progress",
  },
  {
    id: "6",
    type: "error",
    title: "Payment Processing Failed",
    description: "Customer payment for order #38295 failed due to expired credit card.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    read: true,
    status: "failed",
    target: {
      id: "o38295",
      name: "Order #38295",
      type: "Order",
      link: "/dashboard/orders/38295",
    },
  },
  {
    id: "7",
    type: "complete",
    title: "Backup Completed",
    description: "Daily system backup completed successfully. All systems operational.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    status: "completed",
  },
];

const topProducts = [
  { id: 1, name: "Premium Dashboard UI Kit", sales: 1234, revenue: 45600, growth: 12.5 },
  { id: 2, name: "Mobile App Template", sales: 943, revenue: 28290, growth: 8.2 },
  { id: 3, name: "CRM Software License", sales: 825, revenue: 49500, growth: 15.7 },
  { id: 4, name: "Data Visualization Pack", sales: 734, revenue: 22020, growth: -2.3 },
  { id: 5, name: "Authentication Service", sales: 652, revenue: 19560, growth: 5.8 },
];

const recentUsers = [
  { id: "u1", name: "Alex Johnson", email: "alex@example.com", status: "active", joinDate: "2023-11-28" },
  { id: "u2", name: "Maria Garcia", email: "maria@example.com", status: "active", joinDate: "2023-11-27" },
  { id: "u3", name: "James Wilson", email: "james@example.com", status: "inactive", joinDate: "2023-11-26" },
  { id: "u4", name: "Sophia Lee", email: "sophia@example.com", status: "active", joinDate: "2023-11-25" },
];

export default function Dashboard() {
  const { theme } = useTheme();

  // Handle refresh data
  const handleRefresh = () => {
    console.log("Refreshing dashboard data...");
    // In a real application, you would fetch fresh data here
  };

  return (
    <>
      <Head>
        <title>Dashboard Overview | NextDash</title>
      </Head>

      <DashboardLayout pageTitle="Dashboard Overview">
        {/* Dashboard Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your business performance.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="default" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value={1234567}
            valuePrefix="$"
            description="Total revenue this month"
            trend={{ value: 12.5, timeframe: "vs last month" }}
            icon={<DollarSign className="h-5 w-5 text-primary" />}
            iconBackground="bg-primary/10"
            formatter={(value) => formatCurrency(value, "USD").replace("$", "")}
          />
          <StatCard
            title="New Customers"
            value={3245}
            description="Customers acquired this month"
            trend={{ value: 8.2, timeframe: "vs last month" }}
            icon={<Users className="h-5 w-5 text-indigo-500" />}
            iconBackground="bg-indigo-100 dark:bg-indigo-900/20"
            variant="info"
          />
          <StatCard
            title="Total Orders"
            value={12456}
            description="Orders processed this month"
            trend={{ value: -2.3, timeframe: "vs last month" }}
            icon={<ShoppingCart className="h-5 w-5 text-amber-500" />}
            iconBackground="bg-amber-100 dark:bg-amber-900/20"
            variant="warning"
          />
          <StatCard
            title="Conversion Rate"
            value="3.2%"
            description="Website visitors to customers"
            trend={{ value: 1.1, timeframe: "vs last month" }}
            icon={<TrendingUp className="h-5 w-5 text-green-500" />}
            iconBackground="bg-green-100 dark:bg-green-900/20"
            variant="success"
          />
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Main Charts Section - 2/3 Width */}
          <div className="col-span-1 space-y-4 lg:col-span-2">
            {/* Revenue Chart */}
            <Tabs defaultValue="revenue" className="w-full">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="revenue" icon={<LineChart className="h-4 w-4" />}>Revenue</TabsTrigger>
                  <TabsTrigger value="sales" icon={<BarChart3 className="h-4 w-4" />}>Sales</TabsTrigger>
                  <TabsTrigger value="users" icon={<Users className="h-4 w-4" />}>Users</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Last 12 Months</Badge>
                </div>
              </div>

              <TabsContent value="revenue" className="mt-4">
                <ChartCard
                  title="Revenue Overview"
                  description="Monthly revenue, expenses and profit"
                  data={revenueData}
                  type="line"
                  series={[
                    { dataKey: "revenue", name: "Revenue", color: "#4f46e5" },
                    { dataKey: "expenses", name: "Expenses", color: "#f97316" },
                    { dataKey: "profit", name: "Profit", color: "#10b981" },
                  ]}
                  xAxisDataKey="name"
                  size="lg"
                  allowDownload
                  allowRefresh
                  onRefresh={handleRefresh}
                  timeRanges={["month", "quarter", "year"]}
                  defaultTimeRange="year"
                  footer={
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-primary" />
                        <span className="text-sm">Total Revenue: $1,234,567</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  }
                />
              </TabsContent>

              <TabsContent value="sales" className="mt-4">
                <ChartCard
                  title="Sales Overview"
                  description="Hourly sales distribution"
                  data={salesData}
                  type="bar"
                  series={[
                    { dataKey: "sales", name: "Sales", color: "#4f46e5" },
                  ]}
                  xAxisDataKey="name"
                  size="lg"
                  allowDownload
                  allowRefresh
                  onRefresh={handleRefresh}
                  timeRanges={["day", "week", "month"]}
                  defaultTimeRange="day"
                />
              </TabsContent>

              <TabsContent value="users" className="mt-4">
                <ChartCard
                  title="User Activity"
                  description="Active and new users per day"
                  data={userActivityData}
                  type="area"
                  series={[
                    { dataKey: "active", name: "Active Users", color: "#4f46e5", fillOpacity: 0.2 },
                    { dataKey: "new", name: "New Users", color: "#10b981", fillOpacity: 0.2 },
                  ]}
                  xAxisDataKey="name"
                  size="lg"
                  allowDownload
                  allowRefresh
                  onRefresh={handleRefresh}
                  timeRanges={["week", "month", "quarter"]}
                  defaultTimeRange="week"
                />
              </TabsContent>
            </Tabs>

            {/* Top Products Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Top Products</CardTitle>
                    <CardDescription>Your best performing products this month</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-sm">
                        <th className="pb-2 text-left font-medium">Product</th>
                        <th className="pb-2 text-right font-medium">Sales</th>
                        <th className="pb-2 text-right font-medium">Revenue</th>
                        <th className="pb-2 text-right font-medium">Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map((product) => (
                        <tr key={product.id} className="border-b text-sm">
                          <td className="py-3">{product.name}</td>
                          <td className="py-3 text-right">{formatNumber(product.sales)}</td>
                          <td className="py-3 text-right">{formatCurrency(product.revenue)}</td>
                          <td className="py-3 text-right">
                            <span className={`flex items-center justify-end ${product.growth >= 0 ? "text-green-600" : "text-red-600"}`}>
                              {product.growth >= 0 ? (
                                <ArrowUp className="mr-1 h-4 w-4" />
                              ) : (
                                <ArrowDown className="mr-1 h-4 w-4" />
                              )}
                              {Math.abs(product.growth)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="justify-between border-t px-6 py-4">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>5</strong> of <strong>100</strong> products
                </div>
                <Button variant="ghost" size="sm">
                  View All Products
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            {/* Recent Users */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Users</CardTitle>
                    <CardDescription>New users who joined recently</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={user.status === "active" ? "success" : "secondary"}>
                          {user.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Joined {new Date(user.joinDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - 1/3 Width */}
          <div className="col-span-1 space-y-4">
            {/* Traffic Sources Chart */}
            <ChartCard
              title="Traffic Sources"
              description="Where your visitors are coming from"
              data={trafficSourceData}
              type="pie"
              series={[{ dataKey: "value" }]}
              xAxisDataKey="name"
              size="sm"
              allowRefresh
              onRefresh={handleRefresh}
            />

            {/* Activity Feed */}
            <ActivityFeed
              title="Recent Activity"
              description="Latest actions and system notifications"
              activities={mockActivities}
              showSearch
              showFilters
              maxHeight={500}
              onRefresh={handleRefresh}
              onItemClick={(item) => console.log("Clicked activity:", item)}
              onMarkAsRead={(item) => console.log("Marked as read:", item)}
              filterOptions={[
                { value: "all", label: "All", icon: <Bell className="h-4 w-4" /> },
                { value: "unread", label: "Unread", icon: <Inbox className="h-4 w-4" /> },
                { value: "system", label: "System", icon: <Activity className="h-4 w-4" /> },
                { value: "user", label: "User", icon: <User className="h-4 w-4" /> },
              ]}
            />

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-2">
                  <Users className="h-6 w-6" />
                  <span>Add User</span>
                </Button>
                <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-2">
                  <ShoppingCart className="h-6 w-6" />
                  <span>New Order</span>
                </Button>
                <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  <span>Invoices</span>
                </Button>
                <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-2">
                  <BarChart3 className="h-6 w-6" />
                  <span>Reports</span>
                </Button>
              </CardContent>
            </Card>

            {/* Calendar Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Upcoming Events</CardTitle>
                  <Button variant="ghost" size="icon">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Team Meeting</p>
                      <p className="text-sm text-muted-foreground">Today, 2:00 PM</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/20">
                      <Bell className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="font-medium">Product Launch</p>
                      <p className="text-sm text-muted-foreground">Tomorrow, 10:00 AM</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                      <Wallet className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium">Quarterly Budget Review</p>
                      <p className="text-sm text-muted-foreground">Friday, 11:00 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-center border-t pt-4">
                <Button variant="ghost" size="sm">
                  View All Events
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
