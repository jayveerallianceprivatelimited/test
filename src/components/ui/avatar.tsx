import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        default: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
        "2xl": "h-20 w-20",
      },
      border: {
        none: "",
        default: "ring-2 ring-background",
        accent: "ring-2 ring-primary/20",
      },
      status: {
        none: "",
        online: "after:absolute after:bottom-0 after:right-0 after:h-2.5 after:w-2.5 after:rounded-full after:border-2 after:border-background after:bg-green-500",
        offline: "after:absolute after:bottom-0 after:right-0 after:h-2.5 after:w-2.5 after:rounded-full after:border-2 after:border-background after:bg-muted-foreground",
        busy: "after:absolute after:bottom-0 after:right-0 after:h-2.5 after:w-2.5 after:rounded-full after:border-2 after:border-background after:bg-red-500",
        away: "after:absolute after:bottom-0 after:right-0 after:h-2.5 after:w-2.5 after:rounded-full after:border-2 after:border-background after:bg-amber-500",
      },
      interactive: {
        true: "cursor-pointer transition-transform hover:scale-105",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      border: "none",
      status: "none",
      interactive: false,
    },
  }
)

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  asChild?: boolean
  group?: boolean
  groupPosition?: "first" | "middle" | "last"
  groupOffset?: string
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, border, status, interactive, asChild = false, group, groupPosition, groupOffset, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      avatarVariants({ size, border, status, interactive }),
      group && "inline-block",
      group && groupPosition === "first" && "z-30",
      group && groupPosition === "middle" && `-ml-${groupOffset || "2"} z-20`,
      group && groupPosition === "last" && `-ml-${groupOffset || "2"} z-10`,
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
    delayMs?: number
    variant?: "default" | "primary" | "secondary" | "success" | "warning" | "destructive" | "muted"
  }
>(({ className, variant = "default", delayMs, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    delayMs={delayMs}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full text-sm font-medium",
      variant === "default" && "bg-muted text-muted-foreground",
      variant === "primary" && "bg-primary text-primary-foreground",
      variant === "secondary" && "bg-secondary text-secondary-foreground",
      variant === "success" && "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      variant === "warning" && "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
      variant === "destructive" && "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
      variant === "muted" && "bg-muted text-muted-foreground",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

const AvatarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    limit?: number
    offset?: string
    size?: VariantProps<typeof avatarVariants>["size"]
    border?: VariantProps<typeof avatarVariants>["border"]
    onMoreClick?: () => void
  }
>(({ className, children, limit, offset = "2", size = "default", border = "default", onMoreClick, ...props }, ref) => {
  const childrenArray = React.Children.toArray(children)
  const limitedChildren = limit ? childrenArray.slice(0, limit) : childrenArray
  const overflowCount = limit ? childrenArray.length - limit : 0

  return (
    <div
      ref={ref}
      className={cn("flex items-center", className)}
      {...props}
    >
      {limitedChildren.map((child, index) => {
        if (React.isValidElement(child)) {
          const position = index === 0 ? "first" : index === limitedChildren.length - 1 ? "last" : "middle"
          return React.cloneElement(child as React.ReactElement<AvatarProps>, {
            group: true,
            groupPosition: position,
            groupOffset: offset,
            size,
            border,
            className: cn(child.props.className),
          })
        }
        return child
      })}

      {overflowCount > 0 && (
        <Avatar
          size={size}
          border={border}
          group
          groupPosition="last"
          groupOffset={offset}
          interactive={!!onMoreClick}
          onClick={onMoreClick}
          className="bg-muted"
        >
          <AvatarFallback>+{overflowCount}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
})
AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup }
