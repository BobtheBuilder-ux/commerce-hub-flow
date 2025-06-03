
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

const CartDropdown = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
        <div className="text-center py-8">
          <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Your cart is empty</p>
          <Link to="/products">
            <Button className="mt-4" size="sm">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-lg">Shopping Cart</h3>
        <p className="text-sm text-gray-500">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
      </div>
      
      <div className="max-h-60 overflow-y-auto">
        {cartItems.map((item) => (
          <div key={item.productId} className="p-4 border-b border-gray-100 hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <img 
                src={item.product.images[0] || '/placeholder.svg'} 
                alt={item.product.name}
                className="h-12 w-12 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {item.product.name}
                </h4>
                <p className="text-sm text-gray-500">
                  ${item.price.toFixed(2)} each
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 w-6 p-0"
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Badge variant="secondary" className="px-2 py-1">
                  {item.quantity}
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 w-6 p-0"
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                  onClick={() => removeFromCart(item.productId)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold">Total:</span>
          <span className="font-bold text-lg">${getCartTotal().toFixed(2)}</span>
        </div>
        <div className="flex space-x-2">
          <Link to="/cart" className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              View Cart
            </Button>
          </Link>
          <Link to="/checkout" className="flex-1">
            <Button size="sm" className="w-full">
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;
