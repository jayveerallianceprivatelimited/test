import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const separatorVariants = cva(
  "shrink-0 bg-border",
  {
    variants: {
      orientation: {
        horizontal: "h-[1px] w-full",
        vertical: "h-full w-[1px]",
      },
      variant: {
        default: "bg-border",
        muted: "bg-muted",
        primary: "bg-primary/20",
        secondary: "bg-secondary",
        accent: "bg-accent",
      },
      size: {
        default: "",
        sm: "opacity-70",
        lg: "opacity-100",
      },
      dashed: {
        true: "border-dashed border-0 bg-transparent",
      },
      dotted: {
        true: "border-dotted border-0 bg-transparent",
      },
    },
    compoundVariants: [
      {
        orientation: "horizontal",
        dashed: true,
        class: "border-t",
      },
      {
        orientation: "vertical",
        dashed: true,
        class: "border-l",
      },
      {
        orientation: "horizontal",
        dotted: true,
        class: "border-t",
      },
      {
        orientation: "vertical",
        dotted: true,
        class: "border-l",
      },
    ],
    defaultVariants: {
      orientation: "horizontal",
      variant: "default",
      size: "default",
    },
  }
)

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
    VariantProps<typeof separatorVariants> {
  decorative?: boolean
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    { 
      className, 
      orientation = "horizontal", 
      variant, 
      size, 
      dashed, 
      dotted, 
      decorative = true, 
      ...props 
    }, 
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        separatorVariants({ orientation, variant, size, dashed, dotted }),
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
