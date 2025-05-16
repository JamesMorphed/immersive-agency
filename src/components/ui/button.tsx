
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-black/90 text-white border border-transparent bg-gradient-to-r from-cyberpunk-magenta/20 via-cyberpunk-cyan/20 to-cyberpunk-magenta/20 bg-clip-padding backdrop-blur-sm shadow-sm hover:shadow-cyberpunk-magenta/20 hover:border-cyberpunk-magenta/50 hover:bg-black/80",
        destructive:
          "bg-black/90 text-white border border-transparent bg-gradient-to-r from-red-500/40 via-red-400/40 to-red-500/40 bg-clip-padding backdrop-blur-sm shadow-sm hover:bg-black",
        outline:
          "border border-transparent bg-gradient-to-r from-cyberpunk-magenta/20 via-cyberpunk-cyan/20 to-cyberpunk-magenta/20 bg-clip-padding backdrop-blur-sm bg-black/80 text-white hover:bg-black/60 hover:border-cyberpunk-magenta/50",
        secondary:
          "bg-black/90 text-white border border-transparent bg-gradient-to-r from-cyberpunk-cyan/20 via-cyberpunk-cyan/10 to-cyberpunk-cyan/20 bg-clip-padding backdrop-blur-sm shadow-sm hover:bg-black",
        ghost: "text-white hover:bg-black/50 hover:text-white",
        link: "text-primary underline-offset-4 hover:underline",
        glass: "bg-black/50 backdrop-blur-sm border border-white/10 text-white hover:bg-black/60",
        quest: "relative bg-black text-white font-medium px-6 py-3 rounded-full border border-transparent overflow-hidden transition-all duration-300 hover:shadow-[0_0_10px_2px_rgba(255,55,187,0.3)] group",
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
    
    // Create the gradient overlay for quest variant
    const questGradientOverlay = variant === 'quest' && (
      <>
        <span className="absolute inset-0 bg-gradient-to-r from-cyberpunk-magenta/30 via-cyberpunk-cyan/20 to-cyberpunk-magenta/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <span className="absolute inset-0 border border-gradient-to-r from-cyberpunk-magenta/50 via-cyberpunk-cyan/30 to-cyberpunk-magenta/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </>
    )
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {questGradientOverlay}
        {props.children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
