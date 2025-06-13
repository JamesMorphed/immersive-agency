import Navbar from "@/components/Navbar";
import FeaturedProject from "@/components/FeaturedProject";
import Services from "@/components/Services";
import Technology from "@/components/Technology";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState } from "react";

// Add TypeScript declaration for window.UnicornStudio
declare global {
  interface Window {
    UnicornStudio?: any;
  }
}

const UnicornHero = () => {
  // Animated headline logic from Hero.tsx
  const titles = ["INNOVATING CONTENT", "EMPOWERING HEALTH", "TRANSFORMING ENGAGEMENT"];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isUnscrambling, setIsUnscrambling] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const targetText = titles[currentTitleIndex];
    if (isUnscrambling) {
      setIsComplete(false);
      let scrambledText = Array.from({ length: targetText.length }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(Math.floor(Math.random() * "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".length))).join('');
      setDisplayText(scrambledText);
      const intervalId = setInterval(() => {
        setDisplayText(current => {
          const currentArray = current.split('');
          const targetArray = targetText.split('');
          const scrambledIndices = currentArray.reduce((acc, char, index) => {
            if (char !== targetArray[index]) acc.push(index);
            return acc;
          }, [] as number[]);
          if (scrambledIndices.length === 0) {
            clearInterval(intervalId);
            setIsComplete(true);
            setTimeout(() => {
              setIsUnscrambling(false);
              setTimeout(() => {
                setIsUnscrambling(true);
                setCurrentTitleIndex((currentTitleIndex + 1) % titles.length);
              }, 2000);
            }, 500);
            return current;
          }
          const randomIndex = scrambledIndices[Math.floor(Math.random() * scrambledIndices.length)];
          currentArray[randomIndex] = targetArray[randomIndex];
          return currentArray.join('');
        });
      }, 50);
      return () => clearInterval(intervalId);
    }
  }, [currentTitleIndex, isUnscrambling]);

  const unicornRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.UnicornStudio) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.25/dist/unicornStudio.umd.js';
      script.onload = () => {
        if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      };
      (document.head || document.body).appendChild(script);
    } else if (!window.UnicornStudio.isInitialized) {
      window.UnicornStudio.init();
      window.UnicornStudio.isInitialized = true;
    }
  }, []);
  return (
    <section id="home" className="relative w-screen h-screen min-h-screen flex flex-col justify-center items-center overflow-hidden p-0 m-0">
      <div
        ref={unicornRef}
        data-us-project="lvIYlhQGvzYJSBK1KFx6"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, width: '100vw', height: '100vh', zIndex: 0, margin: 0, padding: 0 }}
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10 pointer-events-none text-center">
        <h2 className="text-xl md:text-2xl font-medium mb-4 text-slate-50 drop-shadow-lg">IMMERSIVE EXPERIENCES</h2>
        <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight min-h-[1.2em]">
          <span className={`inline-block transition-all duration-100 text-4xl sm:text-5xl md:text-7xl leading-tight ${isComplete ? 'font-bold' : 'font-light'}`}>
            <span className="block sm:hidden">
              {displayText.split(' ').slice(0, 1).join(' ')}<br />
              {displayText.split(' ').slice(1).join(' ')}
            </span>
            <span className="hidden sm:block">{displayText}</span>
          </span><br />
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300 mb-8">
          Supporting pharmaceutical innovations with cutting-edge AI technology 
          and immersive design solutions that transform education and training.
        </p>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <UnicornHero />
      <FeaturedProject />
      <Services />
      <Technology />
      <Blog />
      <Footer />
    </div>
  );
};

export default Index;
