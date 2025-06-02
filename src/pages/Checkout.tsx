import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PayPalButton from '@/components/payment/PayPalButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PayPalScriptProvider, ReactPayPalScriptOptions } from '@paypal/react-paypal-js';
import { toast } from '@/components/ui/sonner';

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Shipping and tax calculations
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePaymentSuccess = (orderId: string, paymentId: string) => {
    console.log('Payment successful:', { orderId, paymentId });
    // Store order details in localStorage for the thank you page
    localStorage.setItem('lastOrder', JSON.stringify({
      orderId,
      paymentId,
      total: total.toFixed(2),
      method: 'PayPal',
      timestamp: Date.now()
    }));
    navigate('/thank-you');
  };

  const handleCardPayment = async () => {
    setIsProcessing(true);
    try {
      // Simulate card payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockOrderId = `ORDER_${Date.now()}`;
      const mockPaymentId = `PAY_${Date.now()}`;
      
      // Store order details
      localStorage.setItem('lastOrder', JSON.stringify({
        orderId: mockOrderId,
        paymentId: mockPaymentId,
        total: total.toFixed(2),
        method: 'Credit Card',
        timestamp: Date.now()
      }));
      
      toast.success('Payment processed successfully!');
      clearCart();
      navigate('/thank-you');
    } catch (error) {
      console.error('Card payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  // PayPal sandbox configuration with proper typing
  const paypalOptions: ReactPayPalScriptOptions = {
    clientId: "AYGe6HHa2zKYtGBjx2SN3KJ4uw7wz1E7g_XZ8J4Dx7iT8G_2mM3vQ5fU8nI9pLnR",
    currency: "USD",
    intent: "capture",
    environment: "sandbox" as const,
    "disable-funding": "credit,card",
    "data-page-type": "checkout",
    components: "buttons,marks"
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8 text-brand-chocolate">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First Name" defaultValue="John" />
                  <Input placeholder="Last Name" defaultValue="Doe" />
                </div>
                <Input placeholder="Email" defaultValue="john.doe@example.com" />
                <Input placeholder="Address" defaultValue="123 Test Street" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="City" defaultValue="Test City" />
                  <Input placeholder="Zip Code" defaultValue="12345" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Pay with PayPal (Sandbox)</h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Test Mode:</strong> Use PayPal sandbox account or test credit cards
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Test Email: sb-test@business.example.com | Password: testpass123
                    </p>
                  </div>
                  <PayPalScriptProvider options={paypalOptions}>
                    <PayPalButton onSuccess={handlePaymentSuccess} />
                  </PayPalScriptProvider>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or pay with card</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Input placeholder="4242 4242 4242 4242" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="12/25" />
                    <Input placeholder="123" />
                  </div>
                  <Input placeholder="Test Cardholder" />
                  <Button 
                    className="w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-chocolate"
                    onClick={handleCardPayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)} with Card`}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.productId} className="flex justify-between items-center">
                      <div className="flex-1">
                        <span className="font-medium">{item.product?.name}</span>
                        <span className="text-gray-500 ml-2">x {item.quantity}</span>
                      </div>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Test Information Card */}
            <Card className="mt-6 bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Test Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-blue-700">
                <div className="space-y-2">
                  <p><strong>PayPal Test:</strong> Use sandbox credentials above</p>
                  <p><strong>Card Test:</strong> Use 4242 4242 4242 4242</p>
                  <p><strong>Expiry:</strong> Any future date (12/25)</p>
                  <p><strong>CVV:</strong> Any 3 digits (123)</p>
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

export default Checkout;
