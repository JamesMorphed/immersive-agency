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
  return;
};
export default ConfigurationSection;