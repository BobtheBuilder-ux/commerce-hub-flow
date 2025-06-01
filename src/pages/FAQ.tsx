
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and Apple Pay for your convenience."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days."
    },
    {
      question: "Can I return items?",
      answer: "Yes, we offer a 30-day return policy for unused items in original packaging."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we ship within the United States. International shipping will be available soon."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email to monitor your package."
    },
    {
      question: "Are your products organic?",
      answer: "Many of our food products are organic and certified. Look for the organic label on product pages."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-brand-chocolate">
            Frequently Asked Questions
          </h1>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Didn't find what you're looking for?
            </p>
            <a 
              href="/contact" 
              className="text-brand-gold hover:text-brand-gold-dark font-semibold"
            >
              Contact our support team
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
