
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface MegaNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MegaNavigation = ({ isOpen, onClose }: MegaNavigationProps) => {
  if (!isOpen) return null;

  const menuItems = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/projects', label: 'Projects' },
    { to: '/technology', label: 'Technology' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md">
      <div className="flex h-full">
        {/* Left side - Navigation Items */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <nav className="space-y-8">
            {menuItems.map((item, index) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className="block text-6xl md:text-7xl lg:text-8xl font-bold text-white hover:text-cyberpunk-magenta transition-colors duration-300 transform hover:translate-x-4"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isOpen ? 'slideInLeft 0.6s ease-out forwards' : 'none'
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right side - Close button and branding */}
        <div className="w-24 md:w-32 flex flex-col justify-between p-8">
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-white hover:text-cyberpunk-magenta self-end"
          >
            <X className="h-8 w-8" />
          </Button>
          
          <div className="self-end">
            <div className="flex items-center rotate-90 origin-center">
              <span className="font-bold neon-text-magenta text-sm">IMMERSIVE</span>
              <span className="ml-1 font-light text-slate-50 text-sm">AGENCY</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MegaNavigation;
