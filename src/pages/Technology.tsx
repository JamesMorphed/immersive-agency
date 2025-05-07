
import Navbar from "@/components/Navbar";
import Technology from "@/components/Technology";
import Footer from "@/components/Footer";

const TechnologyPage = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <Technology />
      </div>
      <Footer />
    </div>
  );
};

export default TechnologyPage;
