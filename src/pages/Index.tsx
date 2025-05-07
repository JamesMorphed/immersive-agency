
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProject from "@/components/FeaturedProject";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Technology from "@/components/Technology";
import Footer from "@/components/Footer";
import TeamSection from "@/components/TeamSection";
import ServicesHighlights from "@/components/ServicesHighlights";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <FeaturedProject />
      <Services />
      <Projects />
      <Technology />
      <TeamSection />
      <ServicesHighlights />
      <Footer />
    </div>
  );
};

export default Index;
