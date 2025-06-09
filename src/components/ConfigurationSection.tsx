
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
    <section id="configuration" className="py-20 bg-gradient-to-b from-black to-cyberpunk-dark-blue relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div ref={elementRef} className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-cyberpunk-magenta text-xl font-medium mb-3">CONFIGURATION</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Easy</span>{' '}
            <span className="gradient-text">Setup</span>
          </h3>
          <p className="text-gray-400 max-w-3xl mx-auto mb-8">
            Get started quickly with our simple configuration. Just copy and paste the code below into your Tailwind config file.
          </p>
          
          <Card className="bg-black/60 backdrop-blur-sm border border-gray-800 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="relative">
                <pre className="text-left text-cyberpunk-cyan text-sm overflow-x-auto">
                  <code>{configCode}</code>
                </pre>
                <Button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 p-2 bg-cyberpunk-magenta hover:bg-cyberpunk-magenta/80"
                  size="sm"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ConfigurationSection;
