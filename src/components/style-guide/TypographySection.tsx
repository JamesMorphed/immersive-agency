
import React from "react";

const TypographySection = () => {
  return (
    <div className="space-y-8">
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
    </div>
  );
};

export default TypographySection;
