import { useState, useEffect } from 'react';
import { Dot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import MegaNavigation from './MegaNavigation';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMegaNavOpen, setIsMegaNavOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
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

  useEffect(() => {
    // Check auth state on mount
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleMegaNavToggle = () => {
    setIsMegaNavOpen(!isMegaNavOpen);
  };

  const handleMegaNavClose = () => {
    setIsMegaNavOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };
  
  return (
    <>
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-cyberpunk-magenta/30' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4 md:py-6">
            <div className="flex items-center">
              {/* Left side intentionally left empty after removing the embed */}
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <span className="text-white font-semibold mr-2">Hello, {user.email}</span>
              )}
              {user && (
                <button
                  onClick={handleLogout}
                  className="btn btn-primary font-bold text-white px-4 py-2 rounded shadow hover:bg-cyberpunk-magenta transition-colors"
                >
                  Logout
                </button>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:text-cyberpunk-magenta hover:bg-transparent scale-75 group"
                onClick={handleMegaNavToggle}
              >
                <div className="flex flex-col gap-px">
                  <div className="flex gap-px">
                    <Dot className="h-1 w-1 group-hover:text-cyberpunk-magenta transition-colors duration-300" style={{ fontSize: '6px' }} />
                    <Dot className="h-1 w-1 group-hover:text-cyberpunk-magenta transition-colors duration-300" style={{ fontSize: '6px' }} />
                    <Dot className="h-1 w-1 group-hover:text-cyberpunk-magenta transition-colors duration-300" style={{ fontSize: '6px' }} />
                  </div>
                  <div className="flex gap-px">
                    <Dot className="h-1 w-1 group-hover:text-cyberpunk-magenta transition-colors duration-300" style={{ fontSize: '6px' }} />
                    <Dot className="h-1 w-1 group-hover:text-cyberpunk-magenta transition-colors duration-300" style={{ fontSize: '6px' }} />
                    <Dot className="h-1 w-1 group-hover:text-cyberpunk-magenta transition-colors duration-300" style={{ fontSize: '6px' }} />
                  </div>
                  <div className="flex gap-px">
                    <Dot className="h-1 w-1 group-hover:text-cyberpunk-magenta transition-colors duration-300" style={{ fontSize: '6px' }} />
                    <Dot className="h-1 w-1 group-hover:text-cyberpunk-magenta transition-colors duration-300" style={{ fontSize: '6px' }} />
                    <Dot className="h-1 w-1 group-hover:text-cyberpunk-magenta transition-colors duration-300" style={{ fontSize: '6px' }} />
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MegaNavigation isOpen={isMegaNavOpen} onClose={handleMegaNavClose} />
    </>
  );
};

export default Navbar;
