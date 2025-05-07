import { useState, useEffect } from 'react';
import { Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
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
  return <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-cyberpunk-magenta/30' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:py-6">
          <div className="flex items-center">
            <h1 className="font-bold neon-text-magenta text-base">IMMERSIVE</h1>
            <span className="ml-1 font-light mt-3 text-slate-50 text-base my-0">AGENCY</span>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:text-cyberpunk-magenta">
                <Grid3X3 size={24} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black/95 backdrop-blur-md border border-cyberpunk-cyan/30 w-40">
              <NavMenuItem href="#home">Home</NavMenuItem>
              <NavMenuItem href="#services">Services</NavMenuItem>
              <NavMenuItem href="#projects">Projects</NavMenuItem>
              <NavMenuItem href="#technology">Technology</NavMenuItem>
              <NavMenuItem href="#contact">Contact</NavMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>;
};
const NavMenuItem = ({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return <DropdownMenuItem asChild className="focus:bg-cyberpunk-magenta/20 focus:text-cyberpunk-magenta cursor-pointer">
      <a href={href} className="w-full block py-2 text-gray-300 hover:text-cyberpunk-magenta transition-colors">
        {children}
      </a>
    </DropdownMenuItem>;
};
export default Navbar;