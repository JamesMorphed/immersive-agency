import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
          
          <nav className="hidden md:flex space-x-10">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#technology">Technology</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white hover:text-cyberpunk-magenta">
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && <div className="md:hidden bg-black/95 backdrop-blur-md border-y border-cyberpunk-cyan/30">
          <div className="px-4 py-4 space-y-4">
            <MobileNavLink href="#home" onClick={() => setMobileMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink href="#services" onClick={() => setMobileMenuOpen(false)}>Services</MobileNavLink>
            <MobileNavLink href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</MobileNavLink>
            <MobileNavLink href="#technology" onClick={() => setMobileMenuOpen(false)}>Technology</MobileNavLink>
            <MobileNavLink href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</MobileNavLink>
          </div>
        </div>}
    </header>;
};
const NavLink = ({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return <a href={href} className="text-sm font-medium text-gray-300 hover:text-cyberpunk-magenta transition-colors relative group">
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyberpunk-magenta transition-all duration-300 group-hover:w-full"></span>
    </a>;
};
const MobileNavLink = ({
  href,
  children,
  onClick
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return <a href={href} className="block text-base font-medium text-gray-300 hover:text-cyberpunk-magenta transition-colors" onClick={onClick}>
      {children}
    </a>;
};
export default Navbar;