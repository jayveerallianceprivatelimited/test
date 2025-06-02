import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: 
          "border-transparent bg-green-500 text-white hover:bg-green-600",
        warning: 
          "border-transparent bg-amber-500 text-white hover:bg-amber-600",
        info: 
          "border-transparent bg-blue-500 text-white hover:bg-blue-600",
        ghost: 
          "border-transparent bg-background text-muted-foreground hover:bg-muted",
      },
      size: {
        default: "h-6 px-2.5 py-0.5 text-xs",
        sm: "h-5 px-2 py-0 text-xs",
        lg: "h-7 px-3 py-1 text-sm",
      },
      rounded: {
        default: "rounded-full",
        md: "rounded-md",
        sm: "rounded-sm",
        none: "rounded-none",
      },
      interactive: {
        true: "cursor-pointer",
        false: "",
      },
      removable: {
        true: "pr-1",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
      interactive: false,
      removable: false,
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
  onRemove?: () => void
}

function Badge({
  className,
  variant,
  size,
  rounded,
  interactive,
  removable,
  icon,
  onRemove,
  children,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, rounded, interactive, removable }), className)} {...props}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
      {removable && onRemove && (
        <button
          className="ml-1 rounded-full p-0.5 text-xs hover:bg-background/20"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  )
}

export { Badge, badgeVariants }
