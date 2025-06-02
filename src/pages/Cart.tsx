
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    toast.error("Coupon functionality not implemented yet");
  };

  const handleCheckout = () => {
    if (!currentUser) {
      toast.error("Please sign in to checkout");
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
        
        {items.length === 0 ? (
          // Empty cart
          <div className="flex flex-col items-center justify-center py-16">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Add some products to your cart to get started</p>
            <Link to="/products">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          // Cart with items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Product</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map(item => (
                      <TableRow key={item.productId}>
                        <TableCell>
                          <div className="w-16 h-16 overflow-hidden rounded-md">
                            <img 
                              src={item.product.images?.[0] || '/placeholder.svg'} 
                              alt={item.product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link to={`/products/${item.productId}`} className="font-medium hover:text-brand-purple transition-colors">
                            {item.product.name}
                          </Link>
                        </TableCell>
                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8" 
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8" 
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              disabled={item.quantity >= (item.product.inventory || 0)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeFromCart(item.productId)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <CardFooter className="flex justify-between py-4">
                  <Button variant="outline" onClick={() => clearCart()}>
                    Clear Cart
                  </Button>
                  <Link to="/products">
                    <Button variant="outline">Continue Shopping</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  {/* Coupon Code */}
                  <form onSubmit={handleApplyCoupon} className="mb-6">
                    <div className="flex gap-2 mb-1">
                      <Input placeholder="Coupon code" />
                      <Button type="submit" variant="outline">Apply</Button>
                    </div>
                    <p className="text-xs text-gray-500">Enter your coupon code if you have one</p>
                  </form>
                  
                  {/* Price Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">Calculated at checkout</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Shipping and taxes will be calculated at checkout
                      </p>
                    </div>
                  </div>
                  
                  {/* Checkout Button */}
                  <Button 
                    className="w-full mt-6" 
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  {!currentUser && (
                    <p className="text-xs text-center mt-2 text-gray-500">
                      You'll need to sign in to complete your order
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
