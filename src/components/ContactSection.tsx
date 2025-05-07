
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Globe } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-cyberpunk-cyan text-xl font-medium mb-3">GET IN TOUCH</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="neon-text-magenta">Start Your</span> 
            <span className="text-white"> Transformation</span>
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ready to revolutionize your pharmaceutical education and training? Contact us to discuss your project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                  <Input 
                    type="text" 
                    id="name" 
                    placeholder="Your name" 
                    className="bg-gray-900 border-gray-800 focus:border-cyberpunk-magenta text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <Input 
                    type="email" 
                    id="email" 
                    placeholder="your@email.com" 
                    className="bg-gray-900 border-gray-800 focus:border-cyberpunk-magenta text-white"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-2">Company</label>
                <Input 
                  type="text" 
                  id="company" 
                  placeholder="Your company" 
                  className="bg-gray-900 border-gray-800 focus:border-cyberpunk-magenta text-white"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us about your project" 
                  rows={5}
                  className="bg-gray-900 border-gray-800 focus:border-cyberpunk-magenta text-white"
                />
              </div>
              
              <Button className="bg-cyberpunk-magenta hover:bg-cyberpunk-magenta/80 text-white w-full py-6">
                Send Message
              </Button>
            </form>
          </div>
          
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-bold text-white mb-4">Contact Information</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-cyberpunk-cyan">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-300">Email</p>
                    <a href="mailto:info@nexusimmersive.com" className="text-cyberpunk-magenta hover:text-cyberpunk-magenta/80">
                      info@nexusimmersive.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-cyberpunk-cyan">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-300">Phone</p>
                    <a href="tel:+1234567890" className="text-cyberpunk-magenta hover:text-cyberpunk-magenta/80">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-cyberpunk-cyan">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-300">Website</p>
                    <a href="https://www.nexusimmersive.com" target="_blank" rel="noopener noreferrer" className="text-cyberpunk-magenta hover:text-cyberpunk-magenta/80">
                      www.nexusimmersive.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-white mb-4">Office Location</h4>
              <p className="text-gray-400">
                Nexus Tower<br />
                123 Innovation Street<br />
                Tech District<br />
                San Francisco, CA 94103
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
