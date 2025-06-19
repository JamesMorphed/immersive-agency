
import StickyHeader from "@/components/StickyHeader";
import FeaturedProject from "@/components/FeaturedProject";
import Services from "@/components/Services";
import Technology from "@/components/Technology";
import Reviews from "@/components/Reviews";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState } from "react";

// Add TypeScript declaration for window.UnicornStudio
declare global {
  interface Window {
    UnicornStudio?: any;
  }
}

const CXIHero = () => {
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
    <section className="relative w-screen h-screen min-h-screen flex flex-col justify-center items-center overflow-hidden p-0 m-0">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/lovable-uploads/a3a64e57-ed8b-4463-a9ed-43b8158e03e7.png')" }}
      />
      
      {/* WebGL Effect Overlay */}
      <div
        ref={unicornRef}
        data-us-project="lvIYlhQGvzYJSBK1KFx6"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, width: '100vw', height: '100vh', zIndex: 5, margin: 0, padding: 0 }}
      />
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-start z-10 pointer-events-none px-4 sm:px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            <h2 className="text-lg md:text-xl font-medium mb-4 text-white/90">
              Content Experience, Innovation<br />
              + Artificial Intelligence
            </h2>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight">
              CXI+AI
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <StickyHeader />
      <CXIHero />
      <FeaturedProject />
      <Services />
      <Technology />
      <Reviews />
      <Blog />
      <Footer />
    </div>
  );
};

export default Index;
