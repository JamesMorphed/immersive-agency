
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Info, Search, X } from "lucide-react";

const ButtonsSection = () => {
  return (
    <div className="space-y-8">
      <div className="grid gap-6">
        <h2 className="text-2xl font-bold border-b border-gray-800 pb-2">Button Variants</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
            <h3 className="text-xl font-bold">Default</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default Button</Button>
              <Button variant="default" disabled>Default Disabled</Button>
            </div>
            <p className="text-sm text-gray-400">Standard button with magenta glow effect</p>
          </div>
          
          <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
            <h3 className="text-xl font-bold">Secondary</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="secondary" disabled>Secondary Disabled</Button>
            </div>
            <p className="text-sm text-gray-400">Button with white glow effect</p>
          </div>
          
          <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
            <h3 className="text-xl font-bold">Destructive</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="destructive">Destructive Button</Button>
              <Button variant="destructive" disabled>Destructive Disabled</Button>
            </div>
            <p className="text-sm text-gray-400">Button for destructive actions with red gradient</p>
          </div>
          
          <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
            <h3 className="text-xl font-bold">Ghost</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="ghost" disabled>Ghost Disabled</Button>
            </div>
            <p className="text-sm text-gray-400">Minimal button with no background</p>
          </div>
          
          <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
            <h3 className="text-xl font-bold">Link</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="link">Link Button</Button>
              <Button variant="link" disabled>Link Disabled</Button>
            </div>
            <p className="text-sm text-gray-400">Button styled as a link</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <h2 className="text-2xl font-bold border-b border-gray-800 pb-2">Button Sizes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
            <h3 className="text-xl font-bold">Small</h3>
            <Button variant="default" size="sm">Small Button</Button>
            <p className="text-sm text-gray-400">Small button variant (size="sm")</p>
          </div>
          
          <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
            <h3 className="text-xl font-bold">Default</h3>
            <Button variant="default">Default Button</Button>
            <p className="text-sm text-gray-400">Default button size</p>
          </div>
          
          <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
            <h3 className="text-xl font-bold">Large</h3>
            <Button variant="default" size="lg">Large Button</Button>
            <p className="text-sm text-gray-400">Large button variant (size="lg")</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <h2 className="text-2xl font-bold border-b border-gray-800 pb-2">Button with Icons</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
            <div className="flex items-center gap-4">
              <Button variant="default">
                <Search className="h-4 w-4" /> 
                Search
              </Button>
              <p className="text-sm text-gray-400">Button with an icon before text</p>
            </div>
          </div>
          
          <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
            <div className="flex items-center gap-4">
              <Button variant="default">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="text-sm text-gray-400">Button with an icon after text</p>
            </div>
          </div>
          
          <div className="bg-black/50 border border-gray-800 rounded-lg p-6 space-y-6">
            <h3 className="text-xl font-bold">Icon Only</h3>
            <div className="flex gap-4">
              <Button variant="default" size="icon">
                <X className="h-4 w-4" />
              </Button>
              <Button variant="default" size="icon">
                <Check className="h-4 w-4" />
              </Button>
              <Button variant="default" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-400">Button with only an icon (size="icon")</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonsSection;
