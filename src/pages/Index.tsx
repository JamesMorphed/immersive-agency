
import StickyHeader from "@/components/StickyHeader";
import NewHero from "@/components/NewHero";
import BusinessPillars from "@/components/BusinessPillars";
import FeaturedProjects from "@/components/FeaturedProjects";
import StatsSection from "@/components/StatsSection";
import InsightsBlog from "@/components/InsightsBlog";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <StickyHeader />
      <NewHero />
      <BusinessPillars />
      <FeaturedProjects />
      <StatsSection />
      <InsightsBlog />
      <Footer />
    </div>
  );
};

export default Index;
