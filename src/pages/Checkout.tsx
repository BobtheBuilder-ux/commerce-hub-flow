import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '@/contexts/CartContext';
import { useToast } from "@/hooks/use-toast";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { createOrder } from '@/services/orderService';
import { useAuth } from '@/contexts/AuthContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart, getCartTotal } = useContext(CartContext);
  const { toast } = useToast();
  const { user } = useAuth();

  const [shippingForm, setShippingForm] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartTotal();
  const taxRate = 0.08;
  const shippingCost = subtotal > 50 ? 0 : 10;
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingCost;

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handlePlaceOrder = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to place an order",
        variant: "destructive",
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before placing an order",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const orderData = {
        userId: user.uid,
        items: cartItems,
        subtotal: subtotal,
        tax: tax,
        shipping: shippingCost,
        total: total,
        shippingAddress: {
          addressLine1: shippingForm.address,
          city: shippingForm.city,
          state: shippingForm.state,
          postalCode: shippingForm.zipCode,
          country: 'US',
          isDefault: false,
          id: ''
        }
      };

      const order = await createOrder(orderData);
      
      // Clear cart after successful order
      clearCart();
      
      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${order.id} has been placed.`,
      });

      // Redirect to thank you page or order confirmation
      navigate('/thank-you');
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Order Failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Information */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="123 Main St"
                  required
                  value={shippingForm.address}
                  onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="New York"
                  required
                  value={shippingForm.city}
                  onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="NY"
                  required
                  value={shippingForm.state}
                  onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  placeholder="10001"
                  required
                  value={shippingForm.zipCode}
                  onChange={(e) => setShippingForm({ ...shippingForm, zipCode: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button
              className="w-full mt-4"
              onClick={handlePlaceOrder}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
