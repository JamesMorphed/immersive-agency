
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Import refactored section components
import TypographySection from "@/components/style-guide/TypographySection";
import ColorsSection from "@/components/style-guide/ColorsSection";
import ButtonsSection from "@/components/style-guide/ButtonsSection";
import CardsSection from "@/components/style-guide/CardsSection";
import IconsSection from "@/components/style-guide/IconsSection";
import CustomIconsSection from "@/components/style-guide/CustomIconsSection";
import IMSIconsSection from "@/components/style-guide/IMSIconsSection";

const StyleGuidePage = () => {
  const { isVisible, elementRef } = useScrollAnimation();
  const [refreshCount, setRefreshCount] = useState(0);
  
  const handleIconsRefresh = () => {
    setRefreshCount(prev => prev + 1);
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div 
          ref={elementRef}
          className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 gradient-text">Style Guide</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl">
            This style guide provides a comprehensive overview of the design system elements used across the website.
          </p>
          
          <Tabs defaultValue="typography" className="w-full mb-20">
            <TabsList className="mb-8">
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="buttons">Buttons</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="icons">Icons</TabsTrigger>
              <TabsTrigger value="custom-icons">Custom Icons</TabsTrigger>
              <TabsTrigger value="ims-icons">IMS Icons</TabsTrigger>
            </TabsList>
            
            <TabsContent value="typography">
              <TypographySection />
            </TabsContent>
            
            <TabsContent value="colors">
              <ColorsSection />
            </TabsContent>
            
            <TabsContent value="buttons">
              <ButtonsSection />
            </TabsContent>
            
            <TabsContent value="cards">
              <CardsSection />
            </TabsContent>
            
            <TabsContent value="icons">
              <IconsSection />
            </TabsContent>
            
            <TabsContent value="custom-icons">
              <CustomIconsSection 
                refreshCount={refreshCount} 
                onRefresh={handleIconsRefresh} 
              />
            </TabsContent>
            
            <TabsContent value="ims-icons">
              <IMSIconsSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StyleGuidePage;
