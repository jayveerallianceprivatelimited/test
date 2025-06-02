import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tabsRootVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "",
        outline: "rounded-md border",
        card: "rounded-lg border bg-card shadow-sm",
      },
      size: {
        default: "",
        sm: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const tabsListVariants = cva(
  "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
  {
    variants: {
      variant: {
        default: "bg-muted",
        outline: "bg-transparent border-b",
        pills: "bg-transparent space-x-1",
        underline: "bg-transparent border-b border-border p-0 w-full justify-start space-x-6",
        card: "bg-muted/50 p-0.5",
      },
      fullWidth: {
        true: "w-full grid",
        false: "",
      },
      position: {
        top: "",
        bottom: "order-last",
        left: "flex-col h-auto w-auto items-start justify-start p-0 mr-4",
        right: "flex-col h-auto w-auto items-start justify-start p-0 ml-4 order-last",
      },
    },
    compoundVariants: [
      {
        fullWidth: true,
        position: ["top", "bottom"],
        class: "grid-flow-col auto-cols-fr",
      },
      {
        fullWidth: true,
        position: ["left", "right"],
        class: "grid-flow-row auto-rows-fr",
      },
    ],
    defaultVariants: {
      variant: "default",
      fullWidth: false,
      position: "top",
    },
  }
)

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
  {
    variants: {
      variant: {
        default: "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        outline: "data-[state=active]:border-b-transparent data-[state=active]:border-b-2 shadow-none rounded-none px-4 py-2 -mb-px",
        pills: "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
        underline: "rounded-none px-0 py-2 border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none",
        card: "rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      },
      size: {
        default: "px-3 py-1.5",
        sm: "px-2 py-1 text-xs",
        lg: "px-4 py-2",
      },
      fullWidth: {
        true: "flex w-full",
        false: "",
      },
      position: {
        top: "",
        bottom: "",
        left: "justify-start w-full",
        right: "justify-start w-full",
      },
      withIcon: {
        true: "gap-2",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
      position: "top",
      withIcon: false,
    },
  }
)

const tabsContentVariants = cva(
  "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "",
        outline: "p-4",
        card: "p-4",
      },
      animate: {
        none: "",
        fade: "data-[state=inactive]:animate-out data-[state=inactive]:fade-out data-[state=active]:animate-in data-[state=active]:fade-in",
        slide: "data-[state=inactive]:animate-out data-[state=inactive]:slide-out-to-left data-[state=active]:animate-in data-[state=active]:slide-in-from-right",
        zoom: "data-[state=inactive]:animate-out data-[state=inactive]:zoom-out-95 data-[state=active]:animate-in data-[state=active]:zoom-in-95",
      },
    },
    defaultVariants: {
      variant: "default",
      animate: "fade",
    },
  }
)

interface TabsRootProps extends 
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
  VariantProps<typeof tabsRootVariants> {}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsRootProps
>(({ className, variant, size, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    className={cn(tabsRootVariants({ variant, size }), className)}
    {...props}
  />
))
Tabs.displayName = TabsPrimitive.Root.displayName

interface TabsListProps extends 
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
  VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, fullWidth, position, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant, fullWidth, position }), className)}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

interface TabsTriggerProps extends 
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
  VariantProps<typeof tabsTriggerVariants> {
    icon?: React.ReactNode;
  }

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, size, fullWidth, position, withIcon, icon, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, size, fullWidth, position, withIcon: !!icon }), className)}
    {...props}
  >
    {icon && <span className="mr-1">{icon}</span>}
    {children}
  </TabsPrimitive.Trigger>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

interface TabsContentProps extends 
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
  VariantProps<typeof tabsContentVariants> {}

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, variant, animate, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(tabsContentVariants({ variant, animate }), className)}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
