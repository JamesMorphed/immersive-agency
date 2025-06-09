
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Card, CardContent } from '@/components/ui/card';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ConfigurationSection = () => {
  const {
    isVisible,
    elementRef
  } = useScrollAnimation();
  
  const configCode = `// Tailwind.config.js
module.exports = {
  content: ["./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}"],
  presets: [require("@relume_io/relume-tailwind")],
};`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(configCode);
  };
  
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div 
          ref={elementRef}
          className={`transition-all duration-1000 transform ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl font-bold text-center mb-8">Configuration</h2>
          <Card className="max-w-2xl mx-auto bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Tailwind Config</h3>
                <Button
                  onClick={copyToClipboard}
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              </div>
              <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto">
                <code className="text-sm text-gray-300">{configCode}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ConfigurationSection;
