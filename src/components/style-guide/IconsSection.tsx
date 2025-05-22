
import React from "react";
import { ArrowRight, ChevronDown, Check, Info, Search, X } from "lucide-react";

const IconsSection = () => {
  return (
    <div className="space-y-8">
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
    </div>
  );
};

export default IconsSection;
