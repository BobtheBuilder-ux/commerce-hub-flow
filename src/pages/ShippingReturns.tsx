
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, RotateCcw, Shield, Clock } from 'lucide-react';

const ShippingReturns = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8 text-center text-brand-chocolate">
          Shipping & Returns
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-brand-gold" />
                <span>Shipping Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Standard Shipping</h3>
                <p className="text-gray-600">3-5 business days - $4.99</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Express Shipping</h3>
                <p className="text-gray-600">1-2 business days - $9.99</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Free Shipping</h3>
                <p className="text-gray-600">On orders over $50</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Processing Time</h3>
                <p className="text-gray-600">Orders are processed within 1-2 business days</p>
              </div>
            </CardContent>
          </Card>

          {/* Returns Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <RotateCcw className="h-5 w-5 text-brand-gold" />
                <span>Returns Policy</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">30-Day Returns</h3>
                <p className="text-gray-600">Return items within 30 days for a full refund</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Return Conditions</h3>
                <p className="text-gray-600">Items must be unused and in original packaging</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Return Shipping</h3>
                <p className="text-gray-600">Free return shipping on defective items</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Refund Processing</h3>
                <p className="text-gray-600">Refunds processed within 3-5 business days</p>
              </div>
            </CardContent>
          </Card>

          {/* Quality Guarantee */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-brand-gold" />
                <span>Quality Guarantee</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                We stand behind the quality of our products. If you're not completely 
                satisfied with your purchase, we'll make it right.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>100% satisfaction guarantee</li>
                <li>Quality inspection before shipping</li>
                <li>Secure packaging to prevent damage</li>
                <li>Customer support available 7 days a week</li>
              </ul>
            </CardContent>
          </Card>

          {/* International Shipping */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-brand-gold" />
                <span>International Shipping</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Currently, we ship within the United States only. International 
                shipping options are coming soon!
              </p>
              <div>
                <h3 className="font-semibold mb-2">Coming Soon</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Canada shipping</li>
                  <li>European Union shipping</li>
                  <li>Worldwide shipping options</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShippingReturns;
