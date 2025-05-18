
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative pb-[75%] overflow-hidden">
          <img 
            src={product.images[0] || '/placeholder.svg'} 
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {product.salePrice && product.salePrice < product.price && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
              SALE
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
          <div className="mb-2">
            <span className="text-gray-500 text-sm">{product.category}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {product.salePrice ? (
                <>
                  <span className="font-semibold text-lg text-gray-900">${product.salePrice.toFixed(2)}</span>
                  <span className="ml-2 text-gray-500 text-sm line-through">${product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="font-semibold text-lg text-gray-900">${product.price.toFixed(2)}</span>
              )}
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-brand-purple hover:bg-brand-purple hover:text-white"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
          {product.inventory <= 5 && product.inventory > 0 && (
            <p className="text-amber-600 text-xs mt-2">Only {product.inventory} left in stock</p>
          )}
          {product.inventory === 0 && (
            <p className="text-red-600 text-xs mt-2">Out of stock</p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
