
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/sonner';

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // Simulate order placement
    toast.success("Order placed successfully!");
    clearCart();
    navigate('/thank-you');
  };

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

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
                  <Input placeholder="First Name" />
                  <Input placeholder="Last Name" />
                </div>
                <Input placeholder="Email" />
                <Input placeholder="Address" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="City" />
                  <Input placeholder="Zip Code" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Card Number" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="MM/YY" />
                  <Input placeholder="CVV" />
                </div>
                <Input placeholder="Cardholder Name" />
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
                    <div key={item.productId} className="flex justify-between">
                      <span>{item.product.name} x {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$9.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(subtotal * 0.08).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${(subtotal + 9.99 + (subtotal * 0.08)).toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    className="w-full mt-6 bg-brand-gold hover:bg-brand-gold-dark text-brand-chocolate"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
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
