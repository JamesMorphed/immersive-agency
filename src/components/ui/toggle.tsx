
import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors hover:bg-black/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-black data-[state=on]:text-white data-[state=on]:border data-[state=on]:border-transparent data-[state=on]:bg-gradient-to-r data-[state=on]:from-cyberpunk-magenta/40 data-[state=on]:via-cyberpunk-cyan/40 data-[state=on]:to-cyberpunk-magenta/40 data-[state=on]:bg-clip-padding",
  {
    variants: {
      variant: {
        default: "bg-black/80",
        outline:
          "border border-transparent bg-gradient-to-r from-cyberpunk-magenta/30 via-cyberpunk-cyan/20 to-cyberpunk-magenta/30 bg-clip-padding bg-black/80",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
