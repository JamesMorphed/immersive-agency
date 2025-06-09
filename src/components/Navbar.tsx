import { useState, useEffect } from 'react';
import { Dot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MegaNavigation from './MegaNavigation';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMegaNavOpen, setIsMegaNavOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleMegaNavToggle = () => {
    setIsMegaNavOpen(!isMegaNavOpen);
  };

  const handleMegaNavClose = () => {
    setIsMegaNavOpen(false);
  };
  
  return (
    <>
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-cyberpunk-magenta/30' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4 md:py-6">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <h1 className="font-bold neon-text-magenta text-base">IMMERSIVE</h1>
                <span className="ml-1 font-light text-slate-50 text-base">AGENCY</span>
              </Link>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-cyberpunk-magenta scale-75"
              onClick={handleMegaNavToggle}
            >
              <div className="flex flex-col gap-px">
                <div className="flex gap-px">
                  <Dot className="h-1 w-1" style={{ fontSize: '6px' }} />
                  <Dot className="h-1 w-1" style={{ fontSize: '6px' }} />
                  <Dot className="h-1 w-1" style={{ fontSize: '6px' }} />
                </div>
                <div className="flex gap-px">
                  <Dot className="h-1 w-1" style={{ fontSize: '6px' }} />
                  <Dot className="h-1 w-1" style={{ fontSize: '6px' }} />
                  <Dot className="h-1 w-1" style={{ fontSize: '6px' }} />
                </div>
                <div className="flex gap-px">
                  <Dot className="h-1 w-1" style={{ fontSize: '6px' }} />
                  <Dot className="h-1 w-1" style={{ fontSize: '6px' }} />
                  <Dot className="h-1 w-1" style={{ fontSize: '6px' }} />
                </div>
              </div>
            </Button>
          </div>
        </div>
      </header>

      <MegaNavigation isOpen={isMegaNavOpen} onClose={handleMegaNavClose} />
    </>
  );
};

export default Navbar;
