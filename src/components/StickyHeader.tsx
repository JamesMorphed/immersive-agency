
import { useState } from 'react';
import { Dot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MegaNavigation from './MegaNavigation';

const StickyHeader = () => {
  const [isMegaNavOpen, setIsMegaNavOpen] = useState(false);

  const handleMegaNavToggle = () => {
    setIsMegaNavOpen(!isMegaNavOpen);
  };

  const handleMegaNavClose = () => {
    setIsMegaNavOpen(false);
  };

  return (
    <>
      {/* 5px black bar spanning full width */}
      <div className="fixed top-0 left-0 right-0 h-[5px] bg-black z-50"></div>
      
      {/* CXI+AI Badge Container */}
      <div className="fixed top-[5px] left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-end">
          {/* CXI+AI Badge */}
          <div className="bg-black text-white px-6 py-3 flex items-center gap-4 rounded-b-lg shadow-lg">
            <span className="text-xl font-bold tracking-wider">CXI+AI</span>
            
            {/* Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-cyberpunk-magenta hover:bg-transparent scale-75 group p-1"
              onClick={handleMegaNavToggle}
            >
              <div className="flex flex-col gap-px">
                <div className="flex gap-px">
                  <Dot className="h-1 w-1 group-hover:text-cyberpunk-magenta transition-colors duration-300" style={{ fontSize: '4px' }} />
                  <Dot className="h-1 w-1 group-hover:text-cyberpunk-magenta transition-colors duration-300" style={{ fontSize: '4px' }} />
                  <Dot className="h-1 w-1 group-hover:text-cyberpunk-magenta transition-colors duration-300" style={{ fontSize: '4px' }} />
                </div>
                <div className="flex gap-px">
                  <Dot className="h-1 w-1 group-hover:text-cyberpunk-magenta transition-colors duration-300" style={{ fontSize: '4px' }} />
                  <Dot className="h-1 w-1 group-hover:text-cyberpunk-magenta transition-colors duration-300" style={{ fontSize: '4px' }} />
                  <Dot className="h-1 w-1 group-hover:text-cyberpunk-magenta transition-colors duration-300" style={{ fontSize: '4px' }} />
                </div>
                <div className="flex gap-px">
                  <Dot className="h-1 w-1 group-hover:text-cyberpunk-magenta transition-colors duration-300" style={{ fontSize: '4px' }} />
                  <Dot className="h-1 w-1 group-hover:text-cyberpunk-magenta transition-colors duration-300" style={{ fontSize: '4px' }} />
                  <Dot className="h-1 w-1 group-hover:text-cyberpunk-magenta transition-colors duration-300" style={{ fontSize: '4px' }} />
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>

      <MegaNavigation isOpen={isMegaNavOpen} onClose={handleMegaNavClose} />
    </>
  );
};

export default StickyHeader;
