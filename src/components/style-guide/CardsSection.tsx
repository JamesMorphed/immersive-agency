
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const CardsSection = () => {
  return (
    <div className="space-y-8">
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
    </div>
  );
};

export default CardsSection;
