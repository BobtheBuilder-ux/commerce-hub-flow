
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Package, CreditCard, Truck } from 'lucide-react';

const ThankYou = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4 text-brand-chocolate">Thank You for Your Order!</h1>
          <p className="text-gray-600 mb-8">
            Your order has been successfully placed and is being processed. 
            You will receive an email confirmation shortly.
          </p>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Package className="h-8 w-8 text-brand-gold mx-auto mb-2" />
                  <h3 className="font-semibold">Order Confirmed</h3>
                  <p className="text-sm text-gray-600">Your order is being prepared</p>
                </div>
                <div className="text-center">
                  <CreditCard className="h-8 w-8 text-brand-gold mx-auto mb-2" />
                  <h3 className="font-semibold">Payment Processed</h3>
                  <p className="text-sm text-gray-600">Payment received successfully</p>
                </div>
                <div className="text-center">
                  <Truck className="h-8 w-8 text-brand-gold mx-auto mb-2" />
                  <h3 className="font-semibold">Shipping Soon</h3>
                  <p className="text-sm text-gray-600">We'll notify you when shipped</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-x-4">
            <Link to="/dashboard/orders">
              <Button className="bg-brand-gold hover:bg-brand-gold-dark text-brand-chocolate">
                Track Your Order
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ThankYou;
