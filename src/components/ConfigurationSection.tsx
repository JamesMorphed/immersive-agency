
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
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={elementRef}
          className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Configuration</h3>
                <Button onClick={copyToClipboard} size="sm" variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                <code>{configCode}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ConfigurationSection;
