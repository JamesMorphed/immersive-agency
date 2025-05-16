
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, ChevronDown, Info, Search, X } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const StyleGuidePage = () => {
  const { isVisible, elementRef } = useScrollAnimation();
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div 
          ref={elementRef}
          className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 gradient-text">Style Guide</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl">
            This style guide provides a comprehensive overview of the design system elements used across the website.
          </p>
          
          <Tabs defaultValue="typography" className="w-full mb-20">
            <TabsList className="mb-8">
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="buttons">Buttons</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="icons">Icons</TabsTrigger>
            </TabsList>
            
            {/* Typography Section */}
            <TabsContent value="typography" className="space-y-8">
              <div className="grid gap-6">
                <h2 className="text-2xl font-bold border-b border-gray-800 pb-2">Headings</h2>
                
                <div className="space-y-6">
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
                    <h1 className="text-6xl font-bold mb-2">Heading 1</h1>
                    <p className="text-sm text-gray-400">Font: Host Grotesk • Weight: 700 • Size: 60px</p>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
                    <h2 className="text-5xl font-bold mb-2">Heading 2</h2>
                    <p className="text-sm text-gray-400">Font: Host Grotesk • Weight: 700 • Size: 48px</p>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
                    <h3 className="text-4xl font-bold mb-2">Heading 3</h3>
                    <p className="text-sm text-gray-400">Font: Host Grotesk • Weight: 700 • Size: 36px</p>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
                    <h4 className="text-3xl font-bold mb-2">Heading 4</h4>
                    <p className="text-sm text-gray-400">Font: Host Grotesk • Weight: 700 • Size: 30px</p>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
                    <h5 className="text-2xl font-bold mb-2">Heading 5</h5>
                    <p className="text-sm text-gray-400">Font: Host Grotesk • Weight: 700 • Size: 24px</p>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
                    <h6 className="text-xl font-bold mb-2">Heading 6</h6>
                    <p className="text-sm text-gray-400">Font: Host Grotesk • Weight: 700 • Size: 20px</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <h2 className="text-2xl font-bold border-b border-gray-800 pb-2">Body Text</h2>
                
                <div className="space-y-6">
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
                    <p className="text-2xl mb-2">Large Paragraph</p>
                    <p className="text-sm text-gray-400">Font: Noto Sans • Weight: 400 • Size: 24px</p>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
                    <p className="text-lg mb-2">Medium Paragraph</p>
                    <p className="text-sm text-gray-400">Font: Noto Sans • Weight: 400 • Size: 18px</p>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
                    <p className="text-base mb-2">Regular Paragraph</p>
                    <p className="text-sm text-gray-400">Font: Noto Sans • Weight: 400 • Size: 16px</p>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
                    <p className="text-sm mb-2">Small Text</p>
                    <p className="text-sm text-gray-400">Font: Noto Sans • Weight: 400 • Size: 14px</p>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
                    <p className="text-xs mb-2">Extra Small Text</p>
                    <p className="text-sm text-gray-400">Font: Noto Sans • Weight: 400 • Size: 12px</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <h2 className="text-2xl font-bold border-b border-gray-800 pb-2">Special Text Styles</h2>
                
                <div className="space-y-6">
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
                    <p className="gradient-text text-3xl font-bold mb-2">Gradient Text</p>
                    <p className="text-sm text-gray-400">Linear gradient from secondary to primary colors</p>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
                    <p className="text-outline-magenta text-3xl font-bold mb-2">Magenta Outline Text</p>
                    <p className="text-sm text-gray-400">Text with magenta outline</p>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
                    <p className="text-outline-cyan text-3xl font-bold mb-2">Cyan Outline Text</p>
                    <p className="text-sm text-gray-400">Text with cyan outline</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Colors Section */}
            <TabsContent value="colors" className="space-y-8">
              <div className="grid gap-6">
                <h2 className="text-2xl font-bold border-b border-gray-800 pb-2">Primary Colors</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-black/50 border border-gray-800 rounded-lg overflow-hidden">
                    <div className="h-32 bg-cyberpunk-magenta"></div>
                    <div className="p-4">
                      <p className="font-bold">Cyberpunk Magenta</p>
                      <p className="text-sm text-gray-400">#FF37BB</p>
                      <p className="text-sm text-gray-400">--primary: 327 100% 61%</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg overflow-hidden">
                    <div className="h-32 bg-cyberpunk-cyan"></div>
                    <div className="p-4">
                      <p className="font-bold">Cyberpunk Cyan</p>
                      <p className="text-sm text-gray-400">#0038FF</p>
                      <p className="text-sm text-gray-400">--secondary: 225 100% 50%</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg overflow-hidden">
                    <div className="h-32 bg-black"></div>
                    <div className="p-4">
                      <p className="font-bold">Black</p>
                      <p className="text-sm text-gray-400">#000000</p>
                      <p className="text-sm text-gray-400">--background: 0 0% 0%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <h2 className="text-2xl font-bold border-b border-gray-800 pb-2">Text Colors</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-foreground rounded-full"></div>
                      <div>
                        <p className="font-bold">Foreground</p>
                        <p className="text-sm text-gray-400">--foreground: 0 0% 98%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-muted-foreground rounded-full"></div>
                      <div>
                        <p className="font-bold">Muted Foreground</p>
                        <p className="text-sm text-gray-400">--muted-foreground: 240 5% 64.9%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <h2 className="text-2xl font-bold border-b border-gray-800 pb-2">Gradient Examples</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-black/50 border border-gray-800 rounded-lg overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-cyberpunk-magenta to-cyberpunk-cyan"></div>
                    <div className="p-4">
                      <p className="font-bold">Horizontal Gradient</p>
                      <p className="text-sm text-gray-400">from-cyberpunk-magenta to-cyberpunk-cyan</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg overflow-hidden">
                    <div className="h-32 bg-gradient-to-br from-cyberpunk-magenta to-cyberpunk-cyan"></div>
                    <div className="p-4">
                      <p className="font-bold">Diagonal Gradient</p>
                      <p className="text-sm text-gray-400">from-cyberpunk-magenta to-cyberpunk-cyan</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Buttons Section */}
            <TabsContent value="buttons" className="space-y-8">
              <div className="grid gap-6">
                <h2 className="text-2xl font-bold border-b border-gray-800 pb-2">Button Variants</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
                    <h3 className="text-xl font-bold">Default</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="default">Default Button</Button>
                      <Button variant="default" disabled>Default Disabled</Button>
                    </div>
                    <p className="text-sm text-gray-400">Standard button with transparent background and gradient border</p>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
                    <h3 className="text-xl font-bold">Secondary</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="secondary">Secondary Button</Button>
                      <Button variant="secondary" disabled>Secondary Disabled</Button>
                    </div>
                    <p className="text-sm text-gray-400">Blue-accented button with subtle cyan gradient</p>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
                    <h3 className="text-xl font-bold">Neon</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="neon">Neon Button</Button>
                      <Button variant="neon" disabled>Neon Disabled</Button>
                    </div>
                    <p className="text-sm text-gray-400">Button with purple neon border and glow effect</p>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
                    <h3 className="text-xl font-bold">Quest</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="quest">Quest Button</Button>
                      <Button variant="quest" disabled>Quest Disabled</Button>
                    </div>
                    <p className="text-sm text-gray-400">Button with magenta glow and hover effects</p>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
                    <h3 className="text-xl font-bold">Outline</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="outline">Outline Button</Button>
                      <Button variant="outline" disabled>Outline Disabled</Button>
                    </div>
                    <p className="text-sm text-gray-400">Button with just an outline and transparent background</p>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
                    <h3 className="text-xl font-bold">Glass</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="glass">Glass Button</Button>
                      <Button variant="glass" disabled>Glass Disabled</Button>
                    </div>
                    <p className="text-sm text-gray-400">Semi-transparent button with backdrop blur effect</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <h2 className="text-2xl font-bold border-b border-gray-800 pb-2">Button Sizes</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
                    <h3 className="text-xl font-bold">Small</h3>
                    <Button variant="neon" size="sm">Small Button</Button>
                    <p className="text-sm text-gray-400">Small button variant (size="sm")</p>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
                    <h3 className="text-xl font-bold">Default</h3>
                    <Button variant="neon">Default Button</Button>
                    <p className="text-sm text-gray-400">Default button size</p>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
                    <h3 className="text-xl font-bold">Large</h3>
                    <Button variant="neon" size="lg">Large Button</Button>
                    <p className="text-sm text-gray-400">Large button variant (size="lg")</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <h2 className="text-2xl font-bold border-b border-gray-800 pb-2">Button with Icons</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
                    <h3 className="text-xl font-bold">Leading Icon</h3>
                    <Button variant="neon">
                      <Search className="mr-2 h-4 w-4" /> Search
                    </Button>
                    <p className="text-sm text-gray-400">Button with an icon before text</p>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
                    <h3 className="text-xl font-bold">Trailing Icon</h3>
                    <Button variant="neon">
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <p className="text-sm text-gray-400">Button with an icon after text</p>
                  </div>
                  
                  <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
                    <h3 className="text-xl font-bold">Icon Only</h3>
                    <div className="flex gap-4">
                      <Button variant="neon" size="icon">
                        <X className="h-4 w-4" />
                      </Button>
                      <Button variant="neon" size="icon">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button variant="neon" size="icon">
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-400">Button with only an icon (size="icon")</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Cards Section */}
            <TabsContent value="cards" className="space-y-8">
              <div className="grid gap-6">
                <h2 className="text-2xl font-bold border-b border-gray-800 pb-2">Card Styles</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="bg-black/50 border border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">Standard Card</h3>
                      <p className="text-gray-300">This is a standard card component with dark background and border.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-black/30 border border-cyberpunk-magenta/20 neon-border-magenta">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">Magenta Neon Card</h3>
                      <p className="text-gray-300">Card with magenta neon border effect.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-black/30 border border-cyberpunk-cyan/20 neon-border-cyan">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">Cyan Neon Card</h3>
                      <p className="text-gray-300">Card with cyan neon border effect.</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-black/90 to-cyberpunk-magenta/10 border border-white/5">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">Gradient Card</h3>
                      <p className="text-gray-300">Card with subtle gradient background.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="grid gap-6">
                <h2 className="text-2xl font-bold border-b border-gray-800 pb-2">Interactive Cards</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-black/50 border border-gray-800 rounded-lg overflow-hidden group transition-all duration-300 hover:border-cyberpunk-magenta/50 hover:shadow-[0_0_15px_rgba(255,55,187,0.3)]">
                    <div className="h-40 bg-cyberpunk-black overflow-hidden">
                      <div className="w-full h-full bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url('/lovable-uploads/9a65e14a-201c-4fbd-9f38-ff5993abda13.png')` }}></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all duration-300">Hover Card</h3>
                      <p className="text-gray-300">Interactive card with hover effects.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Icons Section */}
            <TabsContent value="icons" className="space-y-8">
              <div className="grid gap-6">
                <h2 className="text-2xl font-bold border-b border-gray-800 pb-2">Lucide Icons</h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  <div className="flex flex-col items-center justify-center p-4 bg-black/50 border border-gray-800 rounded-lg">
                    <ArrowRight className="h-12 w-12 mb-2" />
                    <p className="text-sm text-center">ArrowRight</p>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-4 bg-black/50 border border-gray-800 rounded-lg">
                    <Search className="h-12 w-12 mb-2" />
                    <p className="text-sm text-center">Search</p>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-4 bg-black/50 border border-gray-800 rounded-lg">
                    <Check className="h-12 w-12 mb-2" />
                    <p className="text-sm text-center">Check</p>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-4 bg-black/50 border border-gray-800 rounded-lg">
                    <X className="h-12 w-12 mb-2" />
                    <p className="text-sm text-center">X</p>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-4 bg-black/50 border border-gray-800 rounded-lg">
                    <Info className="h-12 w-12 mb-2" />
                    <p className="text-sm text-center">Info</p>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-4 bg-black/50 border border-gray-800 rounded-lg">
                    <ChevronDown className="h-12 w-12 mb-2" />
                    <p className="text-sm text-center">ChevronDown</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <h2 className="text-2xl font-bold border-b border-gray-800 pb-2">Icon Styles</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center justify-center p-6 bg-black/50 border border-gray-800 rounded-lg">
                    <ArrowRight className="h-12 w-12 mb-4 text-cyberpunk-magenta" />
                    <p className="text-sm text-center text-gray-400">Magenta Icon</p>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-6 bg-black/50 border border-gray-800 rounded-lg">
                    <ArrowRight className="h-12 w-12 mb-4 text-cyberpunk-cyan" />
                    <p className="text-sm text-center text-gray-400">Cyan Icon</p>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-6 bg-black/50 border border-gray-800 rounded-lg">
                    <ArrowRight className="h-12 w-12 mb-4 animate-neon-pulse" />
                    <p className="text-sm text-center text-gray-400">Animated Icon</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StyleGuidePage;
