
import React from "react";

const ColorsSection = () => {
  return (
    <div className="space-y-8">
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
    </div>
  );
};

export default ColorsSection;
