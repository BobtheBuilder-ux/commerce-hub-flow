
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Package, CreditCard, Truck, Copy } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface OrderDetails {
  orderId: string;
  paymentId: string;
  total: string;
  method: string;
  timestamp: number;
}

const ThankYou = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // Retrieve order details from localStorage
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      try {
        const orderData = JSON.parse(lastOrder);
        setOrderDetails(orderData);
        // Clear the order data after retrieving it
        localStorage.removeItem('lastOrder');
      } catch (error) {
        console.error('Error parsing order data:', error);
      }
    }
  }, []);

  const copyOrderId = () => {
    if (orderDetails?.orderId) {
      navigator.clipboard.writeText(orderDetails.orderId);
      toast.success('Order ID copied to clipboard');
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4 text-brand-chocolate">Thank You for Your Order!</h1>
            <p className="text-gray-600 text-lg">
              Your order has been successfully placed and is being processed. 
              You will receive an email confirmation shortly.
            </p>
          </div>

          {orderDetails && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Order Details
                  <span className="text-sm font-normal text-gray-500">
                    {formatDate(orderDetails.timestamp)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Order ID</label>
                    <div className="flex items-center space-x-2">
                      <p className="font-mono text-sm">{orderDetails.orderId}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={copyOrderId}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Payment Method</label>
                    <p className="font-medium">{orderDetails.method}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Payment ID</label>
                    <p className="font-mono text-sm">{orderDetails.paymentId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Total Amount</label>
                    <p className="font-bold text-lg text-green-600">${orderDetails.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Package className="h-10 w-10 text-brand-gold mx-auto mb-3" />
                  <h3 className="font-semibold text-lg">Order Confirmed</h3>
                  <p className="text-sm text-gray-600">Your order is being prepared</p>
                </div>
                <div className="text-center">
                  <CreditCard className="h-10 w-10 text-brand-gold mx-auto mb-3" />
                  <h3 className="font-semibold text-lg">Payment Processed</h3>
                  <p className="text-sm text-gray-600">Payment received successfully</p>
                </div>
                <div className="text-center">
                  <Truck className="h-10 w-10 text-brand-gold mx-auto mb-3" />
                  <h3 className="font-semibold text-lg">Shipping Soon</h3>
                  <p className="text-sm text-gray-600">We'll notify you when shipped</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Mode Notice */}
          <Card className="mb-8 bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <p className="text-yellow-800 font-medium">Test Mode</p>
              </div>
              <p className="text-sm text-yellow-700 mt-2">
                This was a test transaction. No real money was charged. 
                In production, you would receive actual email confirmations and tracking information.
              </p>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
