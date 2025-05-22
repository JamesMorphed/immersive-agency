
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CustomIcon } from "@/components/ui/custom-icon";
import IconUploader from "@/components/IconUploader";
import IconGallery from "@/components/IconGallery";

interface CustomIconsSectionProps {
  refreshCount: number;
  onRefresh: () => void;
}

const CustomIconsSection = ({ refreshCount, onRefresh }: CustomIconsSectionProps) => {
  return (
    <div className="space-y-8">
      <div className="grid gap-6">
        <h2 className="text-2xl font-bold border-b border-gray-800 pb-2">Custom SVG Icons</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-black/50 border border-gray-800">
            <CardContent className="p-6 space-y-6">
              <h3 className="text-xl font-bold">Upload New Icons</h3>
              <p className="text-gray-400 mb-4">
                Upload your custom SVG icons with optional variants. Icons should be in SVG format and optimized for web use.
              </p>
              <IconUploader onSuccess={onRefresh} />
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border border-gray-800">
            <CardContent className="p-6 space-y-6">
              <h3 className="text-xl font-bold">Usage</h3>
              <div className="space-y-4">
                <div className="bg-black/70 p-4 rounded-md">
                  <h4 className="font-semibold mb-2">Basic Usage</h4>
                  <pre className="text-sm overflow-x-auto p-2 bg-black/50 rounded border border-gray-800">
                    {`<CustomIcon name="icon-name" />`}
                  </pre>
                </div>
                
                <div className="bg-black/70 p-4 rounded-md">
                  <h4 className="font-semibold mb-2">With Variant</h4>
                  <pre className="text-sm overflow-x-auto p-2 bg-black/50 rounded border border-gray-800">
                    {`<CustomIcon name="icon-name" variant="magenta" />`}
                  </pre>
                </div>
                
                <div className="bg-black/70 p-4 rounded-md">
                  <h4 className="font-semibold mb-2">With Size</h4>
                  <pre className="text-sm overflow-x-auto p-2 bg-black/50 rounded border border-gray-800">
                    {`<CustomIcon name="icon-name" size="lg" />`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8">
          <IconGallery key={`gallery-${refreshCount}`} onRefresh={onRefresh} />
        </div>
        
        <div className="bg-black/50 border border-gray-800 rounded-lg p-6 mt-8">
          <h3 className="text-xl font-bold mb-4">Styling Examples</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col items-center bg-black/70 p-4 rounded-md">
              <div className="mb-4">
                <CustomIcon name="example" size="lg" className="animate-bounce" />
              </div>
              <p className="text-sm text-center text-gray-400">Bouncing Animation</p>
              <pre className="text-xs mt-2 w-full overflow-x-auto p-2 bg-black/50 rounded border border-gray-800">
                {`<CustomIcon name="icon" className="animate-bounce" />`}
              </pre>
            </div>
            
            <div className="flex flex-col items-center bg-black/70 p-4 rounded-md">
              <div className="mb-4">
                <CustomIcon name="example" size="lg" className="animate-neon-pulse" />
              </div>
              <p className="text-sm text-center text-gray-400">Neon Pulse Animation</p>
              <pre className="text-xs mt-2 w-full overflow-x-auto p-2 bg-black/50 rounded border border-gray-800">
                {`<CustomIcon name="icon" className="animate-neon-pulse" />`}
              </pre>
            </div>
            
            <div className="flex flex-col items-center bg-black/70 p-4 rounded-md">
              <div className="mb-4">
                <CustomIcon 
                  name="example" 
                  size="lg"
                  className="transition-transform duration-500 hover:rotate-180" 
                />
              </div>
              <p className="text-sm text-center text-gray-400">Hover Rotation</p>
              <pre className="text-xs mt-2 w-full overflow-x-auto p-2 bg-black/50 rounded border border-gray-800">
                {`<CustomIcon name="icon" className="hover:rotate-180" />`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomIconsSection;
