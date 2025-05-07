
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
        <section className="py-12 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="w-full md:w-1/2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">Get in Touch</h1>
                <p className="text-xl text-gray-400 mb-6">
                  We'd love to hear from you. Let's start a conversation about how we can help.
                </p>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="bg-gray-800 rounded-lg overflow-hidden w-full max-w-md aspect-[4/3] flex items-center justify-center">
                  <svg className="h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
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
