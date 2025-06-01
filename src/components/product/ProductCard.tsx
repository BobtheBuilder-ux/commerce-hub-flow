
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Star } from 'lucide-react';
import LazyImage from '@/components/ui/LazyImage';

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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover border border-brand-beige-dark">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <LazyImage 
            src={product.images[0] || '/placeholder.svg'} 
            alt={product.name}
            className="w-full h-full transition-transform duration-300 hover:scale-105"
          />
          {product.salePrice && product.salePrice < product.price && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full shadow-md">
              {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
            </div>
          )}
          {product.featured && (
            <div className="absolute top-3 left-3 bg-brand-gold text-brand-chocolate px-2 py-1 text-xs font-bold rounded-full shadow-md">
              FEATURED
            </div>
          )}
        </div>
        
        <div className="p-5">
          <h3 className="text-lg font-semibold text-brand-chocolate mb-2 line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>
          
          <div className="mb-3">
            <span className="text-brand-chocolate-light text-sm font-medium px-2 py-1 bg-brand-beige rounded-full">
              {product.category}
            </span>
          </div>

          {/* Rating */}
          {product.averageRating && (
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${
                      index < Math.floor(product.averageRating || 0)
                        ? 'text-brand-gold fill-brand-gold'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-brand-chocolate-light ml-2">
                ({product.averageRating.toFixed(1)})
              </span>
            </div>
          )}
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {product.salePrice ? (
                <>
                  <span className="font-bold text-xl text-brand-chocolate">
                    ${product.salePrice.toFixed(2)}
                  </span>
                  <span className="text-gray-500 text-sm line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="font-bold text-xl text-brand-chocolate">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            <Button 
              size="sm" 
              className="bg-brand-gold hover:bg-brand-gold-dark text-brand-chocolate font-medium px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              onClick={handleAddToCart}
              disabled={product.inventory === 0}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Stock Status */}
          {product.inventory <= 5 && product.inventory > 0 && (
            <p className="text-amber-600 text-xs font-medium bg-amber-50 px-2 py-1 rounded-full text-center">
              Only {product.inventory} left in stock
            </p>
          )}
          {product.inventory === 0 && (
            <p className="text-red-600 text-xs font-medium bg-red-50 px-2 py-1 rounded-full text-center">
              Out of stock
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
