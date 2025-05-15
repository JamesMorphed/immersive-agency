
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <div className="pt-32">
        <Projects />
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
