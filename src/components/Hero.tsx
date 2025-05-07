
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Hero = () => {
  const titles = ["INNOVATING CONTENT", "EMPOWERING HEALTH", "TRANSFORMING ENGAGEMENT"];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isUnscrambling, setIsUnscrambling] = useState(true);
  
  const { isVisible: isContentVisible, elementRef: contentRef } = useScrollAnimation();
  const { isVisible: isButtonVisible, elementRef: buttonRef } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true
  });

  useEffect(() => {
    const targetText = titles[currentTitleIndex];
    if (isUnscrambling) {
      // Unscramble effect - gradually replace random characters with correct ones
      let scrambledText = Array.from({
        length: targetText.length
      }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(Math.floor(Math.random() * "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".length))).join('');
      setDisplayText(scrambledText);
      const intervalId = setInterval(() => {
        setDisplayText(current => {
          // Replace a random character with the correct one
          const currentArray = current.split('');
          const targetArray = targetText.split('');

          // Find which characters are still scrambled
          const scrambledIndices = currentArray.reduce((acc, char, index) => {
            if (char !== targetArray[index]) acc.push(index);
            return acc;
          }, [] as number[]);

          // If all characters are correct, stop the unscrambling
          if (scrambledIndices.length === 0) {
            clearInterval(intervalId);

            // Schedule the next title change after a delay
            setTimeout(() => {
              setIsUnscrambling(false);

              // Schedule a scrambling effect after showing the full title for a while
              setTimeout(() => {
                setIsUnscrambling(true);
                setCurrentTitleIndex((currentTitleIndex + 1) % titles.length);
              }, 2000); // Show the full title for 2 seconds
            }, 500); // Small delay after unscrambling completes

            return current;
          }

          // Pick a random scrambled index to fix
          const randomIndex = scrambledIndices[Math.floor(Math.random() * scrambledIndices.length)];
          currentArray[randomIndex] = targetArray[randomIndex];
          return currentArray.join('');
        });
      }, 50); // Try to replace a character every 50ms

      return () => clearInterval(intervalId);
    }
  }, [currentTitleIndex, isUnscrambling]);

  return <section id="home" className="relative min-h-screen flex flex-col justify-center items-center grid-lines-bg">
      {/* Black gradient overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <div 
          ref={contentRef}
          className={`transition-all duration-1000 transform ${
            isContentVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-xl md:text-2xl font-medium mb-4 text-slate-50">IMMERSIVE EXPERIENCES</h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight min-h-[1.2em]">
            <span className="inline-block transition-all duration-100 text-7xl">{displayText}</span><br />
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300 mb-8">
            Supporting pharmaceutical innovations with cutting-edge AI technology 
            and immersive design solutions that transform education and training.
          </p>
        </div>
      </div>
      
      <div 
        ref={buttonRef}
        className={`absolute bottom-10 left-0 right-0 flex justify-center z-20 transition-all duration-700 transform ${
          isButtonVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
      >
        <a href="#services" className="text-gray-400 hover:text-white">
          <div className="border-2 border-gray-400 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </a>
      </div>
    </section>;
};
export default Hero;
