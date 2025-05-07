
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesHighlights from "@/components/ServicesHighlights";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        {/* Hero section with "Get in Touch" heading */}
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0E0024] via-[#6B0069] to-[#00A3FF] opacity-90"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center text-center py-20">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">Get in Touch</h1>
              <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                We'd love to hear from you. Let's start a conversation about how we can help.
              </p>
              <div className="flex space-x-4">
                <a href="#contact-form" className="bg-cyberpunk-magenta hover:bg-opacity-80 text-white font-semibold py-3 px-6 rounded-md transition-all">
                  Contact Us
                </a>
                <a href="#services" className="bg-cyberpunk-cyan hover:bg-opacity-80 text-white font-semibold py-3 px-6 rounded-md transition-all">
                  Our Services
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Highlights Section */}
        <ServicesHighlights />
        
        {/* Team Section */}
        <TeamSection />
        
        {/* Contact Form Section */}
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
