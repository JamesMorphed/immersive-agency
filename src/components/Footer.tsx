import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <h1 className="font-bold neon-text-magenta text-lg">IMMERSIVE</h1>
              <span className="text-white font-light text-lg">AGENCY</span>
            </div>
            <p className="mt-4 text-gray-400 max-w-md">
              Pushing the boundaries of pharmaceutical education and training through 
              immersive technology and innovative design solutions.
            </p>
            
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-cyberpunk-cyan transition-colors">Home</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-cyberpunk-cyan transition-colors">Services</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-cyberpunk-cyan transition-colors">Projects</a></li>
              <li><a href="#technology" className="text-gray-400 hover:text-cyberpunk-cyan transition-colors">Technology</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-cyberpunk-cyan transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-cyberpunk-cyan transition-colors">AI-Powered Education</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyberpunk-cyan transition-colors">Virtual Product Experiences</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyberpunk-cyan transition-colors">Advanced HCP Training</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyberpunk-cyan transition-colors">Data Visualization</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyberpunk-cyan transition-colors">Product Launch Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Immersive Agency. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
