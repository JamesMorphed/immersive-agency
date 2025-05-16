
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-black/90 text-white border border-transparent bg-gradient-to-r from-cyberpunk-magenta/40 via-cyberpunk-cyan/40 to-cyberpunk-magenta/40 bg-clip-padding backdrop-blur-sm shadow-sm hover:shadow-cyberpunk-magenta/20 hover:bg-black",
        destructive:
          "bg-black/90 text-white border border-transparent bg-gradient-to-r from-red-500/40 via-red-400/40 to-red-500/40 bg-clip-padding backdrop-blur-sm shadow-sm hover:bg-black",
        outline:
          "border border-transparent bg-gradient-to-r from-cyberpunk-magenta/40 via-cyberpunk-cyan/40 to-cyberpunk-magenta/40 bg-clip-padding backdrop-blur-sm bg-black/80 text-white hover:bg-black",
        secondary:
          "bg-black/90 text-white border border-transparent bg-gradient-to-r from-cyberpunk-cyan/40 via-cyberpunk-cyan/20 to-cyberpunk-cyan/40 bg-clip-padding backdrop-blur-sm shadow-sm hover:bg-black",
        ghost: "text-white hover:bg-black/50 hover:text-white",
        link: "text-primary underline-offset-4 hover:underline",
        glass: "bg-black/50 backdrop-blur-sm border border-white/10 text-white hover:bg-black/60",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-full px-4",
        lg: "h-11 rounded-full px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
