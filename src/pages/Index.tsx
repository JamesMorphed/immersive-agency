
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProject from "@/components/FeaturedProject";
import Services from "@/components/Services";
import Technology from "@/components/Technology";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <FeaturedProject />
      <Services />
      <Technology />
      <Blog />
      <Footer />
    </div>
  );
};

export default Index;
