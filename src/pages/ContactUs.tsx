
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const ContactUs = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8 text-center text-brand-chocolate">Contact Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First Name" required />
                  <Input placeholder="Last Name" required />
                </div>
                <Input type="email" placeholder="Email" required />
                <Input placeholder="Subject" required />
                <Textarea placeholder="Your message" rows={5} required />
                <Button type="submit" className="w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-chocolate">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-brand-gold" />
                  <span>123 Golden Street, City, State 12345</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-brand-gold" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-brand-gold" />
                  <span>hello@shophub.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-brand-gold" />
                  <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visit Our Store</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Map would be displayed here</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactUs;
