import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { Mail } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    inquiryType: 'General',
    hearAboutUs: '',
    message: '',
    agreeToTerms: false
  });

  const { isVisible: isHeaderVisible, elementRef: headerRef } = useScrollAnimation();
  const { isVisible: isFormVisible, elementRef: formRef } = useScrollAnimation({
    threshold: 0.1
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      agreeToTerms: checked
    }));
  };
  
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      inquiryType: value
    }));
  };
  
  const handleRadioChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      hearAboutUs: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast.success('Message sent! We will get back to you soon.');
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      inquiryType: 'General',
      hearAboutUs: '',
      message: '',
      agreeToTerms: false
    });
  };

  return <section id="contact-form" className="py-16 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div 
          ref={headerRef}
          className={`text-left mb-16 transition-all duration-1000 transform ${
            isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Immersive Studio project assessment</h2>
          <p className="text-gray-400">The form will take approximately 8 minutes to complete.</p>
        </div>

        <div 
          ref={formRef}
          className={`bg-gray-900/50 p-8 rounded-lg border border-gray-800 transition-all duration-1000 transform ${
            isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName" className="text-white mb-2">First name</Label>
                <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name" className="bg-gray-800 border-gray-700 text-white" required />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-white mb-2">Last name</Label>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" className="bg-gray-800 border-gray-700 text-white" required />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="email" className="text-white mb-2">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className="bg-gray-800 border-gray-700 text-white" required />
              </div>
              <div>
                <Label htmlFor="phoneNumber" className="text-white mb-2">Phone number</Label>
                <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="(123) 456-7890" className="bg-gray-800 border-gray-700 text-white" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="inquiryType" className="text-white mb-2">Choose a topic</Label>
              <Select value={formData.inquiryType} onValueChange={handleSelectChange}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="General">General Inquiry</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Partnership">Partnership</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <p className="text-white mb-3">How did you learn about us?</p>
              <RadioGroup value={formData.hearAboutUs} onValueChange={handleRadioChange} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="social-media" id="social-media" />
                  <Label htmlFor="social-media" className="text-gray-300">Social Media</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="referral" id="referral" />
                  <Label htmlFor="referral" className="text-gray-300">Personal referral</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="web-search" id="web-search" />
                  <Label htmlFor="web-search" className="text-gray-300">Web search</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="text-gray-300">Other</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="message" className="text-white mb-2">Message</Label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project..." rows={6} className="bg-gray-800 border-gray-700 text-white" required />
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <Checkbox id="terms" checked={formData.agreeToTerms} onCheckedChange={handleCheckboxChange} className="border-gray-500" />
              </div>
              <div className="ml-3 text-sm">
                <Label htmlFor="terms" className="text-gray-300">
                  I agree to the terms
                </Label>
              </div>
            </div>
            
            <div className="text-right">
              <Button type="submit" className="bg-cyberpunk-magenta hover:bg-cyberpunk-magenta/80 text-white px-8">
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>;
};

export default ContactSection;
