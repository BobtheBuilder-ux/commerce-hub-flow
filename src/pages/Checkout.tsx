
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useToast } from "@/hooks/use-toast";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { createOrder } from '@/services/orderService';
import { useAuth } from '@/contexts/AuthContext';
import { CreditCard, Truck, Shield, Clock, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart, getCartTotal } = useCart();
  const { toast } = useToast();
  const { currentUser } = useAuth();

  const [shippingForm, setShippingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState('standard');

  const subtotal = getCartTotal();
  const taxRate = 0.08;
  const shippingOptions = {
    standard: { cost: 5.99, label: 'Standard (5-7 days)', icon: Truck },
    express: { cost: 12.99, label: 'Express (2-3 days)', icon: Clock },
    overnight: { cost: 24.99, label: 'Overnight', icon: Shield }
  };
  const shippingCost = shippingOptions[selectedShipping as keyof typeof shippingOptions].cost;
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingCost;

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handlePlaceOrder = async () => {
    if (!currentUser) {
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
        userId: currentUser.uid,
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
          country: shippingForm.country,
          isDefault: false,
          id: ''
        }
      };

      const order = await createOrder(orderData);
      
      clearCart();
      
      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${order.id} has been placed.`,
      });

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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/cart')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-brand-chocolate">Checkout</h1>
              <p className="text-brand-chocolate-light">Complete your purchase securely</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Shipping Information */}
              <Card className="border-brand-beige-dark">
                <CardHeader>
                  <CardTitle className="flex items-center text-brand-chocolate">
                    <Truck className="h-5 w-5 mr-2" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        required
                        value={shippingForm.firstName}
                        onChange={(e) => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                        className="border-brand-beige-dark"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        required
                        value={shippingForm.lastName}
                        onChange={(e) => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                        className="border-brand-beige-dark"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        value={shippingForm.email}
                        onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                        className="border-brand-beige-dark"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        placeholder="(555) 123-4567"
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                        className="border-brand-beige-dark"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        placeholder="123 Main St"
                        required
                        value={shippingForm.address}
                        onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                        className="border-brand-beige-dark"
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
                        className="border-brand-beige-dark"
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
                        className="border-brand-beige-dark"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        placeholder="10001"
                        required
                        value={shippingForm.zipCode}
                        onChange={(e) => setShippingForm({ ...shippingForm, zipCode: e.target.value })}
                        className="border-brand-beige-dark"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Options */}
              <Card className="border-brand-beige-dark">
                <CardHeader>
                  <CardTitle className="text-brand-chocolate">Shipping Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(shippingOptions).map(([key, option]) => (
                      <div
                        key={key}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedShipping === key 
                            ? 'border-brand-chocolate bg-brand-beige-light' 
                            : 'border-brand-beige-dark hover:border-brand-chocolate'
                        }`}
                        onClick={() => setSelectedShipping(key)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <option.icon className="h-5 w-5 mr-3 text-brand-chocolate" />
                            <span className="font-medium">{option.label}</span>
                          </div>
                          <span className="font-bold text-brand-chocolate">${option.cost}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="border-brand-beige-dark">
                <CardHeader>
                  <CardTitle className="flex items-center text-brand-chocolate">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        placeholder="John Doe"
                        required
                        value={paymentForm.cardholderName}
                        onChange={(e) => setPaymentForm({ ...paymentForm, cardholderName: e.target.value })}
                        className="border-brand-beige-dark"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                        value={paymentForm.cardNumber}
                        onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                        className="border-brand-beige-dark"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        required
                        value={paymentForm.expiryDate}
                        onChange={(e) => setPaymentForm({ ...paymentForm, expiryDate: e.target.value })}
                        className="border-brand-beige-dark"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        required
                        value={paymentForm.cvv}
                        onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value })}
                        className="border-brand-beige-dark"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-brand-beige-dark sticky top-8">
                <CardHeader>
                  <CardTitle className="text-brand-chocolate">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.productId} className="flex items-center space-x-3">
                        <img 
                          src={item.product?.images?.[0] || '/placeholder.svg'} 
                          alt={item.product?.name} 
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-brand-chocolate">{item.product?.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-brand-chocolate">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-medium">${shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax:</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold text-brand-chocolate">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="bg-brand-beige-light p-3 rounded-lg">
                    <div className="flex items-center text-sm text-brand-chocolate">
                      <Shield className="h-4 w-4 mr-2" />
                      <span>Secure 256-bit SSL encryption</span>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <Button
                    className="w-full bg-brand-chocolate hover:bg-brand-chocolate-dark text-white font-semibold py-3"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    size="lg"
                  >
                    {isProcessing ? 'Processing...' : `Complete Order - $${total.toFixed(2)}`}
                  </Button>

                  <p className="text-xs text-center text-gray-500">
                    By placing your order, you agree to our Terms & Conditions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
