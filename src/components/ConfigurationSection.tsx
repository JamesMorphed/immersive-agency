
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Card, CardContent } from '@/components/ui/card';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ConfigurationSection = () => {
  const { isVisible, elementRef } = useScrollAnimation();

  const configCode = `// Tailwind.config.js
module.exports = {
  content: ["./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}"],
  presets: [require("@relume_io/relume-tailwind")],
};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(configCode);
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={elementRef}
          className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Configuration</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get started with our Tailwind configuration for optimal performance
            </p>
          </div>

          <Card className="bg-black/50 border border-gray-800 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Tailwind Configuration</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="text-gray-400 hover:text-white"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                <pre className="text-sm text-gray-300 font-mono">
                  <code>{configCode}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ConfigurationSection;
