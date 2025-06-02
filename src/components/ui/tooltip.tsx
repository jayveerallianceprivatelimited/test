import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const TooltipRoot = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const tooltipContentVariants = cva(
  "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "bg-popover border-border",
        outline: "bg-transparent border-border",
        primary: "bg-primary text-primary-foreground border-primary/20",
        secondary: "bg-secondary text-secondary-foreground border-secondary/20",
        destructive: "bg-destructive text-destructive-foreground border-destructive/20",
        success: "bg-green-500 text-white border-green-600/20",
        warning: "bg-amber-500 text-white border-amber-600/20",
        info: "bg-blue-500 text-white border-blue-600/20",
      },
      size: {
        default: "text-sm",
        sm: "text-xs py-1 px-2",
        lg: "text-base px-4 py-2",
      },
      withArrow: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      withArrow: true,
    },
  }
)

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & 
  VariantProps<typeof tooltipContentVariants> & {
    hideArrow?: boolean;
    arrowClassName?: string;
  }
>(({ 
  className, 
  variant, 
  size, 
  withArrow, 
  hideArrow = false,
  arrowClassName,
  sideOffset = 4, 
  children, 
  ...props 
}, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(tooltipContentVariants({ variant, size, withArrow }), className)}
    {...props}
  >
    {children}
    {!hideArrow && withArrow && (
      <TooltipPrimitive.Arrow 
        className={cn(
          "fill-current", 
          variant === "outline" && "fill-border",
          variant === "primary" && "fill-primary",
          variant === "secondary" && "fill-secondary",
          variant === "destructive" && "fill-destructive",
          variant === "success" && "fill-green-500",
          variant === "warning" && "fill-amber-500",
          variant === "info" && "fill-blue-500",
          arrowClassName
        )} 
        width={12} 
        height={6} 
      />
    )}
  </TooltipPrimitive.Content>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// Compound component for easier usage
interface TooltipProps extends React.ComponentPropsWithoutRef<typeof TooltipRoot> {
  content: React.ReactNode;
  contentProps?: React.ComponentPropsWithoutRef<typeof TooltipContent> & 
    VariantProps<typeof tooltipContentVariants> & {
      hideArrow?: boolean;
      arrowClassName?: string;
    };
  delayDuration?: number;
  skipDelayDuration?: number;
  disableHoverableContent?: boolean;
  children: React.ReactNode;
}

function Tooltip({
  content,
  contentProps,
  delayDuration = 300,
  skipDelayDuration,
  disableHoverableContent,
  children,
  ...props
}: TooltipProps) {
  return (
    <TooltipRoot
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      disableHoverableContent={disableHoverableContent}
      {...props}
    >
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent {...contentProps}>{content}</TooltipContent>
    </TooltipRoot>
  );
}

export { 
  Tooltip,
  TooltipProvider, 
  TooltipRoot, 
  TooltipTrigger, 
  TooltipContent,
  type TooltipProps
}
