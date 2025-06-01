
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsConditions = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-brand-chocolate">
            Terms & Conditions
          </h1>
          
          <Card>
            <CardContent className="pt-6 space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-brand-chocolate">1. Agreement to Terms</h2>
                <p className="text-gray-700">
                  By accessing and using this website, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please 
                  do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-brand-chocolate">2. Use License</h2>
                <p className="text-gray-700 mb-3">
                  Permission is granted to temporarily download one copy of the materials on ShopHub's 
                  website for personal, non-commercial transitory viewing only. This is the grant of a 
                  license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained on the website</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-brand-chocolate">3. Disclaimer</h2>
                <p className="text-gray-700">
                  The materials on ShopHub's website are provided on an 'as is' basis. ShopHub makes 
                  no warranties, expressed or implied, and hereby disclaims and negates all other 
                  warranties including without limitation, implied warranties or conditions of 
                  merchantability, fitness for a particular purpose, or non-infringement of 
                  intellectual property or other violation of rights.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-brand-chocolate">4. Limitations</h2>
                <p className="text-gray-700">
                  In no event shall ShopHub or its suppliers be liable for any damages (including, 
                  without limitation, damages for loss of data or profit, or due to business 
                  interruption) arising out of the use or inability to use the materials on ShopHub's 
                  website, even if ShopHub or a ShopHub authorized representative has been notified 
                  orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-brand-chocolate">5. Privacy Policy</h2>
                <p className="text-gray-700">
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use, 
                  and protect your information when you use our service. By using our service, you 
                  agree to the collection and use of information in accordance with our Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-brand-chocolate">6. Product Information</h2>
                <p className="text-gray-700">
                  We strive to ensure that all product information on our website is accurate. 
                  However, we do not warrant that product descriptions or other content is accurate, 
                  complete, reliable, current, or error-free. We reserve the right to correct any 
                  errors, inaccuracies, or omissions at any time without prior notice.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-brand-chocolate">7. Contact Information</h2>
                <p className="text-gray-700">
                  If you have any questions about these Terms & Conditions, please contact us at:
                </p>
                <div className="mt-2 text-gray-700">
                  <p>Email: legal@shophub.com</p>
                  <p>Phone: (555) 123-4567</p>
                  <p>Address: 123 Golden Street, City, State 12345</p>
                </div>
              </section>

              <section>
                <p className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsConditions;
