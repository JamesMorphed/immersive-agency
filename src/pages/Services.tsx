import Navbar from "@/components/Navbar";
import ServiceHeader from "@/components/ServiceHeader";
import Services from "@/components/Services";
import ServicesHighlights from "@/components/ServicesHighlights";
import Footer from "@/components/Footer";
import { useEffect } from 'react';

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <ServiceHeader />
      <div className="pt-16">
        <Services />
      </div>
      <ServicesHighlights />
      <Footer />
    </div>
  );
};

export default ServicesPage;
