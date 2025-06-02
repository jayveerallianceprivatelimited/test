import React from "react";
import { cn, formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Download,
  Eye,
  FileText,
  Filter,
  MoreHorizontal,
  RefreshCw,
  Search,
  Settings,
  Trash,
  Upload,
  User,
  X,
} from "lucide-react";

// Activity types
export type ActivityType = 
  | "login"
  | "logout"
  | "create"
  | "update"
  | "delete"
  | "upload"
  | "download"
  | "share"
  | "comment"
  | "like"
  | "mention"
  | "assign"
  | "complete"
  | "system"
  | "notification"
  | "warning"
  | "error";

// Activity item interface
export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  timestamp: Date | string;
  user?: {
    id: string;
    name: string;
    avatar?: string;
    role?: string;
  };
  target?: {
    id: string;
    name: string;
    type: string;
    link?: string;
  };
  status?: "pending" | "completed" | "failed" | "in_progress";
  read?: boolean;
  actions?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  }>;
  icon?: React.ReactNode;
  iconBackground?: string;
  link?: string;
  metadata?: Record<string, any>;
}

// Activity feed filter options
export type ActivityFilter = "all" | "unread" | ActivityType;

// Props for the ActivityFeed component
export interface ActivityFeedProps {
  activities: ActivityItem[];
  title?: string;
  description?: string;
  className?: string;
  maxHeight?: number | string;
  showHeader?: boolean;
  showSearch?: boolean;
  showFilters?: boolean;
  showPagination?: boolean;
  emptyState?: React.ReactNode;
  isLoading?: boolean;
  onItemClick?: (item: ActivityItem) => void;
  onMarkAsRead?: (item: ActivityItem) => void;
  onLoadMore?: () => void;
  onRefresh?: () => void;
  onSearch?: (query: string) => void;
  onFilter?: (filter: ActivityFilter) => void;
  filterOptions?: Array<{
    value: ActivityFilter;
    label: string;
    icon?: React.ReactNode;
  }>;
  defaultFilter?: ActivityFilter;
  itemsPerPage?: number;
  footer?: React.ReactNode;
}

// Helper function to get icon for activity type
const getActivityIcon = (type: ActivityType, customIcon?: React.ReactNode): React.ReactNode => {
  if (customIcon) return customIcon;

  switch (type) {
    case "login":
      return <User className="h-4 w-4" />;
    case "logout":
      return <User className="h-4 w-4" />;
    case "create":
      return <FileText className="h-4 w-4" />;
    case "update":
      return <FileText className="h-4 w-4" />;
    case "delete":
      return <Trash className="h-4 w-4" />;
    case "upload":
      return <Upload className="h-4 w-4" />;
    case "download":
      return <Download className="h-4 w-4" />;
    case "share":
      return <Eye className="h-4 w-4" />;
    case "comment":
      return <FileText className="h-4 w-4" />;
    case "like":
      return <Check className="h-4 w-4" />;
    case "mention":
      return <User className="h-4 w-4" />;
    case "assign":
      return <User className="h-4 w-4" />;
    case "complete":
      return <Check className="h-4 w-4" />;
    case "system":
      return <Settings className="h-4 w-4" />;
    case "notification":
      return <Bell className="h-4 w-4" />;
    case "warning":
      return <Bell className="h-4 w-4" />;
    case "error":
      return <X className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

// Helper function to get background color for activity type
const getActivityIconBackground = (type: ActivityType, customBg?: string): string => {
  if (customBg) return customBg;

  switch (type) {
    case "login":
      return "bg-green-100 dark:bg-green-900/20";
    case "logout":
      return "bg-blue-100 dark:bg-blue-900/20";
    case "create":
      return "bg-green-100 dark:bg-green-900/20";
    case "update":
      return "bg-blue-100 dark:bg-blue-900/20";
    case "delete":
      return "bg-red-100 dark:bg-red-900/20";
    case "upload":
      return "bg-indigo-100 dark:bg-indigo-900/20";
    case "download":
      return "bg-indigo-100 dark:bg-indigo-900/20";
    case "share":
      return "bg-purple-100 dark:bg-purple-900/20";
    case "comment":
      return "bg-blue-100 dark:bg-blue-900/20";
    case "like":
      return "bg-pink-100 dark:bg-pink-900/20";
    case "mention":
      return "bg-yellow-100 dark:bg-yellow-900/20";
    case "assign":
      return "bg-orange-100 dark:bg-orange-900/20";
    case "complete":
      return "bg-green-100 dark:bg-green-900/20";
    case "system":
      return "bg-slate-100 dark:bg-slate-900/20";
    case "notification":
      return "bg-blue-100 dark:bg-blue-900/20";
    case "warning":
      return "bg-amber-100 dark:bg-amber-900/20";
    case "error":
      return "bg-red-100 dark:bg-red-900/20";
    default:
      return "bg-slate-100 dark:bg-slate-900/20";
  }
};

// Helper function to get status badge variant
const getStatusBadgeVariant = (status?: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "failed":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    case "in_progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400";
  }
};

export function ActivityFeed({
  activities = [],
  title = "Activity Feed",
  description,
  className,
  maxHeight = 400,
  showHeader = true,
  showSearch = true,
  showFilters = true,
  showPagination = true,
  emptyState,
  isLoading = false,
  onItemClick,
  onMarkAsRead,
  onLoadMore,
  onRefresh,
  onSearch,
  onFilter,
  filterOptions = [
    { value: "all", label: "All", icon: <Bell className="h-4 w-4" /> },
    { value: "unread", label: "Unread", icon: <Bell className="h-4 w-4" /> },
    { value: "notification", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
    { value: "system", label: "System", icon: <Settings className="h-4 w-4" /> },
  ],
  defaultFilter = "all",
  itemsPerPage = 10,
  footer,
}: ActivityFeedProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState<ActivityFilter>(defaultFilter);
  const [page, setPage] = React.useState(1);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  // Handle filter change
  const handleFilterChange = (filter: string) => {
    const newFilter = filter as ActivityFilter;
    setActiveFilter(newFilter);
    if (onFilter) {
      onFilter(newFilter);
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  // Handle load more
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    if (onLoadMore) {
      onLoadMore();
    }
  };

  // Filter activities based on active filter
  const filteredActivities = React.useMemo(() => {
    if (activeFilter === "all") {
      return activities;
    } else if (activeFilter === "unread") {
      return activities.filter((activity) => !activity.read);
    } else {
      return activities.filter((activity) => activity.type === activeFilter);
    }
  }, [activities, activeFilter]);

  // Search activities based on search query
  const searchedActivities = React.useMemo(() => {
    if (!searchQuery) {
      return filteredActivities;
    }
    
    const query = searchQuery.toLowerCase();
    return filteredActivities.filter(
      (activity) =>
        activity.title.toLowerCase().includes(query) ||
        (activity.description && activity.description.toLowerCase().includes(query)) ||
        (activity.user && activity.user.name.toLowerCase().includes(query)) ||
        (activity.target && activity.target.name.toLowerCase().includes(query))
    );
  }, [filteredActivities, searchQuery]);

  // Paginate activities
  const paginatedActivities = React.useMemo(() => {
    return searchedActivities.slice(0, page * itemsPerPage);
  }, [searchedActivities, page, itemsPerPage]);

  // Render empty state
  const renderEmptyState = () => {
    if (emptyState) {
      return emptyState;
    }

    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Bell className="h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-4 text-lg font-medium">No activities found</h3>
        <p className="text-sm text-muted-foreground">
          {searchQuery
            ? "Try adjusting your search or filter to find what you're looking for."
            : "When you have new activities, they will appear here."}
        </p>
      </div>
    );
  };

  // Render loading state
  const renderLoadingState = () => {
    return (
      <div className="space-y-4 py-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
              <div className="h-3 w-full animate-pulse rounded bg-muted" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render activity item
  const renderActivityItem = (activity: ActivityItem) => {
    const {
      id,
      type,
      title,
      description,
      timestamp,
      user,
      target,
      status,
      read,
      actions,
      icon,
      iconBackground,
      link,
    } = activity;

    const activityIcon = getActivityIcon(type, icon);
    const activityIconBg = getActivityIconBackground(type, iconBackground);
    const formattedDate = formatDate(timestamp, "PPp");

    return (
      <div
        key={id}
        className={cn(
          "flex items-start space-x-4 rounded-lg p-3 transition-colors",
          !read && "bg-muted/40",
          onItemClick && "cursor-pointer hover:bg-muted"
        )}
        onClick={() => onItemClick && onItemClick(activity)}
      >
        {/* Activity Icon */}
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", activityIconBg)}>
          {activityIcon}
        </div>

        {/* Activity Content */}
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <p className="font-medium leading-none">{title}</p>
            <div className="flex items-center space-x-2">
              {status && (
                <Badge variant="outline" className={cn("text-xs", getStatusBadgeVariant(status))}>
                  {status.replace("_", " ")}
                </Badge>
              )}
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {formattedDate}
              </div>
            </div>
          </div>

          {description && <p className="text-sm text-muted-foreground">{description}</p>}

          {user && (
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Avatar className="h-4 w-4">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{user.name}</span>
              {user.role && <span className="text-muted-foreground/70">({user.role})</span>}
            </div>
          )}

          {target && (
            <div className="flex items-center space-x-1 text-xs">
              <span className="text-muted-foreground">Target:</span>
              {target.link ? (
                <a
                  href={target.link}
                  className="text-primary hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {target.name}
                </a>
              ) : (
                <span>{target.name}</span>
              )}
              <span className="text-muted-foreground/70">({target.type})</span>
            </div>
          )}

          {actions && actions.length > 0 && (
            <div className="flex items-center space-x-2 pt-1">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant={action.variant || "outline"}
                  className="h-7 rounded-md px-2 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick();
                  }}
                >
                  {action.icon && <span className="mr-1">{action.icon}</span>}
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Activity Actions */}
        <div className="flex items-center space-x-1">
          {!read && onMarkAsRead && (
            <Button
              variant="ghost"
              size="icon-sm"
              className="h-7 w-7"
              onClick={(e) => {
                e.stopPropagation();
                onMarkAsRead(activity);
              }}
            >
              <Check className="h-4 w-4" />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {link && (
                <DropdownMenuItem asChild>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </a>
                </DropdownMenuItem>
              )}
              {!read && onMarkAsRead && (
                <DropdownMenuItem onClick={() => onMarkAsRead(activity)}>
                  <Check className="mr-2 h-4 w-4" />
                  Mark as Read
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" />
                Add to Calendar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      {showHeader && (
        <CardHeader className="space-y-1 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
            </Button>
          </div>

          {(showSearch || showFilters) && (
            <div className="flex flex-col space-y-2 pt-2 sm:flex-row sm:items-center sm:justify-between sm:space-x-2 sm:space-y-0">
              {showSearch && (
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search activities..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              )}

              {showFilters && (
                <div className="flex items-center space-x-2">
                  <Tabs
                    defaultValue={activeFilter}
                    value={activeFilter}
                    onValueChange={handleFilterChange}
                    className="w-full sm:w-auto"
                  >
                    <TabsList className="grid w-full grid-cols-4">
                      {filterOptions.slice(0, 4).map((option) => (
                        <TabsTrigger
                          key={option.value}
                          value={option.value}
                          className="flex items-center space-x-1 text-xs"
                        >
                          {option.icon && <span>{option.icon}</span>}
                          <span className="hidden sm:inline">{option.label}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>

                  {filterOptions.length > 4 && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                          <Filter className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">More Filters</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter Activities</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {filterOptions.slice(4).map((option) => (
                          <DropdownMenuItem
                            key={option.value}
                            onClick={() => handleFilterChange(option.value)}
                            className={cn(
                              activeFilter === option.value && "bg-accent text-accent-foreground"
                            )}
                          >
                            {option.icon && <span className="mr-2">{option.icon}</span>}
                            {option.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              )}
            </div>
          )}
        </CardHeader>
      )}

      <ScrollArea className={cn("h-[400px]", typeof maxHeight === "number" ? `h-[${maxHeight}px]` : `h-[${maxHeight}]`)}>
        <CardContent className="p-0">
          {isLoading ? (
            renderLoadingState()
          ) : paginatedActivities.length === 0 ? (
            renderEmptyState()
          ) : (
            <div className="divide-y">
              {paginatedActivities.map((activity) => renderActivityItem(activity))}
            </div>
          )}
        </CardContent>
      </ScrollArea>

      {(showPagination || footer) && (
        <CardFooter className="flex items-center justify-between border-t p-4">
          {footer ? (
            footer
          ) : (
            <>
              <div className="text-sm text-muted-foreground">
                Showing <strong>{paginatedActivities.length}</strong> of{" "}
                <strong>{searchedActivities.length}</strong> activities
              </div>
              {paginatedActivities.length < searchedActivities.length && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  Load More
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

export default ActivityFeed;
