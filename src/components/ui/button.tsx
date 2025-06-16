
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "relative bg-black text-white font-medium px-6 py-3 rounded-full border border-transparent overflow-hidden transition-all duration-500 shadow-[0_0_10px_2px_rgba(255,55,187,0.3)] group hover:shadow-[0_0_20px_5px_rgba(255,55,187,0.5)]",
        destructive:
          "bg-black/90 text-white border border-transparent bg-gradient-to-r from-red-500/40 via-red-400/40 to-red-500/40 bg-clip-padding backdrop-blur-sm shadow-sm hover:bg-black",
        secondary:
          "relative bg-black text-white font-medium px-6 py-3 rounded-full border border-transparent overflow-hidden transition-all duration-500 shadow-[0_0_10px_2px_rgba(255,255,255,0.3)] group hover:shadow-[0_0_20px_5px_rgba(255,255,255,0.5)]",
        ghost: "text-white hover:bg-black/50 hover:text-white",
        link: "text-primary underline-offset-4 hover:underline",
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
  videoUrl?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, videoUrl, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Create the neon glow overlay for default variant
    const neonGradientOverlay = variant === 'default' && (
      <>
        <span className="absolute inset-0 border border-cyberpunk-magenta rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"></span>
        <span className="absolute inset-0 bg-gradient-to-r from-cyberpunk-magenta/10 via-cyberpunk-magenta/5 to-cyberpunk-magenta/10 opacity-20 group-hover:opacity-40 transition-opacity duration-500"></span>
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-cyberpunk-magenta to-cyberpunk-light-magenta opacity-0 blur-md group-hover:opacity-30 transition-opacity duration-500 group-hover:animate-pulse"></span>
      </>
    )
    
    // Create the white glow overlay for secondary variant
    const secondaryGradientOverlay = variant === 'secondary' && (
      <>
        <span className="absolute inset-0 border border-white rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"></span>
        <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 opacity-20 group-hover:opacity-40 transition-opacity duration-500"></span>
        <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-white to-gray-200 opacity-0 blur-md group-hover:opacity-30 transition-opacity duration-500 group-hover:animate-pulse"></span>
      </>
    )
    
    // Convert YouTube URL to embed format
    const getEmbedUrl = (url: string) => {
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url
    }
    
    if (videoUrl) {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Comp
              className={cn(buttonVariants({ variant, size, className }))}
              ref={ref}
              {...props}
            >
              {variant === 'default' && neonGradientOverlay}
              {variant === 'secondary' && secondaryGradientOverlay}
              <span className="relative z-10 flex items-center gap-2">{props.children}</span>
            </Comp>
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-full bg-black border-cyberpunk-magenta/20">
            <div className="aspect-video w-full">
              <iframe
                src={getEmbedUrl(videoUrl)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
          </DialogContent>
        </Dialog>
      )
    }
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {variant === 'default' && neonGradientOverlay}
        {variant === 'secondary' && secondaryGradientOverlay}
        <span className="relative z-10 flex items-center gap-2">{props.children}</span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
