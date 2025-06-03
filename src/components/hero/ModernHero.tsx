
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart, Star, Zap, TrendingUp, Plus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { fetchDummyJSONProducts } from '@/services/dummyJsonService';
import { Product } from '@/types';

const ModernHero = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await fetchDummyJSONProducts(20);
        const featured = products.filter(p => p.featured).slice(0, 5);
        setFeaturedProducts(featured);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    if (featuredProducts.length > 0) {
      const interval = setInterval(() => {
        setCurrentProductIndex((prev) => (prev + 1) % featuredProducts.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featuredProducts]);

  const currentProduct = featuredProducts[currentProductIndex];

  const handleAddToCart = () => {
    if (currentProduct) {
      addToCart({
        productId: currentProduct.id,
        product: currentProduct,
        quantity: 1,
        price: currentProduct.salePrice || currentProduct.price
      });
      
      toast({
        title: "Added to Cart",
        description: `${currentProduct.name} has been added to your cart.`,
      });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-brand-chocolate via-brand-bronze to-brand-chocolate-dark overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-gold/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-brand-beige/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-brand-cream/20 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute top-10 right-1/3 w-16 h-16 bg-brand-gold/30 rounded-full blur-md animate-bounce"></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-20 animate-float">
          <div className="w-4 h-4 bg-brand-gold rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-1/3 right-32 animate-float">
          <div className="w-3 h-3 bg-brand-cream rounded-full opacity-40"></div>
        </div>
        <div className="absolute bottom-1/3 left-1/4 animate-float">
          <div className="w-5 h-5 bg-brand-beige rounded-full opacity-50"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <div className="space-y-8 text-white">
            {/* Badge */}
            <div className="inline-flex items-center bg-brand-gold/30 border border-brand-gold/50 rounded-full px-6 py-3 backdrop-blur-sm animate-fade-in">
              <Star className="h-5 w-5 text-brand-gold mr-2 animate-spin" />
              <span className="text-brand-cream font-bold text-sm">PREMIUM COLLECTION 2025</span>
              <div className="ml-4 flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-gold to-brand-bronze border-2 border-white animate-pulse"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-bronze to-brand-chocolate border-2 border-white animate-pulse"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-chocolate to-brand-gold border-2 border-white animate-pulse"></div>
              </div>
              <Zap className="ml-3 h-5 w-5 text-brand-gold animate-bounce" />
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight animate-fade-in">
                ELEVATE{' '}
                <span className="bg-gradient-to-r from-brand-gold via-brand-beige to-brand-cream bg-clip-text text-transparent animate-pulse">
                  YOUR
                </span>
              </h1>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight animate-fade-in">
                LIFESTYLE{' '}
                <span className="bg-gradient-to-r from-brand-cream to-brand-gold bg-clip-text text-transparent">
                  WITH
                </span>
              </h1>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-brand-beige animate-fade-in">
                SHOPHUB
              </h1>
            </div>

            {/* Featured Product Info */}
            {currentProduct && (
              <div className="space-y-4 animate-fade-in bg-brand-chocolate/20 backdrop-blur-sm rounded-lg p-6 border border-brand-gold/30">
                <div className="flex items-center space-x-4">
                  <TrendingUp className="h-6 w-6 text-brand-gold animate-bounce" />
                  <h2 className="text-2xl lg:text-3xl font-bold">
                    {currentProduct.name}
                  </h2>
                </div>
                <p className="text-brand-beige text-lg">
                  {currentProduct.description.length > 100 
                    ? `${currentProduct.description.substring(0, 100)}...` 
                    : currentProduct.description
                  }
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(currentProduct.averageRating || 0) 
                            ? 'text-brand-gold fill-current' 
                            : 'text-gray-400'
                        }`} 
                      />
                    ))}
                    <span className="ml-2 text-brand-beige">
                      {currentProduct.averageRating?.toFixed(1)}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-brand-gold">
                    ${currentProduct.salePrice || currentProduct.price}
                    {currentProduct.salePrice && (
                      <span className="text-lg text-gray-400 line-through ml-2">
                        ${currentProduct.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 animate-fade-in">
              {currentProduct && (
                <Button 
                  size="lg" 
                  onClick={handleAddToCart}
                  className="bg-brand-gold hover:bg-brand-gold-dark text-brand-chocolate font-bold px-10 py-4 rounded-xl text-lg shadow-2xl hover:shadow-brand-gold/50 transition-all duration-300 hover:scale-105"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              )}
              <Link to="/products">
                <Button size="lg" className="bg-brand-gold hover:bg-brand-gold-dark text-brand-chocolate font-bold px-10 py-4 rounded-xl text-lg shadow-2xl hover:shadow-brand-gold/50 transition-all duration-300 hover:scale-105">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Shop All
                </Button>
              </Link>
              <Link to="/products?category=Electronics">
                <Button size="lg" variant="outline" className="border-2 border-brand-beige hover:bg-brand-beige hover:text-brand-chocolate text-black font-bold px-10 py-4 rounded-xl text-lg backdrop-blur-sm hover:scale-105 transition-all duration-300">
                  <Zap className="mr-2 h-5 w-5" />
                  Explore Tech
                </Button>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="pt-6 text-sm text-brand-beige/80 animate-fade-in">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-brand-gold mr-1" />
                  <span>Premium Quality</span>
                </div>
                <div className="flex items-center">
                  <ShoppingCart className="h-4 w-4 text-brand-gold mr-1" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-4 w-4 text-brand-gold mr-1" />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Featured Product Showcase */}
          <div className="relative animate-fade-in">
            {currentProduct ? (
              <>
                {/* Main Product Image */}
                <div className="relative z-20">
                  <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-brand-beige/30 to-brand-gold/20 rounded-3xl backdrop-blur-sm border border-brand-gold/30 flex items-center justify-center overflow-hidden shadow-2xl hover:shadow-brand-gold/30 transition-all duration-500 hover:scale-105">
                    <div className="relative">
                      <img 
                        src={currentProduct.images[0] || '/placeholder.svg'} 
                        alt={currentProduct.name} 
                        className="w-80 h-80 object-cover rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute -top-4 -right-4 bg-brand-gold text-brand-chocolate px-3 py-1 rounded-full text-sm font-bold animate-bounce">
                        Featured!
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-gold/30 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-bronze/30 rounded-full blur-xl animate-pulse"></div>
                </div>

                {/* Side Cards */}
                {featuredProducts[1] && (
                  <div className="absolute top-8 -right-8 lg:right-8 bg-brand-beige/20 backdrop-blur-md rounded-2xl p-6 border border-brand-gold/30 w-64 animate-slide-in-right">
                    <h4 className="text-brand-cream font-bold text-lg mb-2">Also Featured</h4>
                    <div className="w-full h-32 bg-gradient-to-br from-brand-gold/40 to-brand-bronze/30 rounded-xl mb-4 flex items-center justify-center">
                      <img 
                        src={featuredProducts[1].images[0] || '/placeholder.svg'} 
                        alt={featuredProducts[1].name} 
                        className="w-24 h-24 object-cover rounded-lg" 
                      />
                    </div>
                    <div className="flex justify-between items-center text-brand-beige/80 text-sm">
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        {featuredProducts[1].averageRating?.toFixed(1)} Rating
                      </span>
                      <ArrowRight className="h-4 w-4 animate-bounce" />
                    </div>
                  </div>
                )}

                {featuredProducts[2] && (
                  <div className="absolute bottom-8 -left-8 lg:left-8 bg-brand-chocolate/20 backdrop-blur-md rounded-2xl p-6 border border-brand-gold/30 w-64 animate-slide-in-right">
                    <h4 className="text-brand-cream font-bold text-lg mb-2">Best Seller</h4>
                    <div className="w-full h-32 bg-gradient-to-br from-brand-bronze/40 to-brand-gold/30 rounded-xl mb-4 flex items-center justify-center">
                      <img 
                        src={featuredProducts[2].images[0] || '/placeholder.svg'} 
                        alt={featuredProducts[2].name} 
                        className="w-24 h-24 object-cover rounded-lg" 
                      />
                    </div>
                    <div className="flex justify-between items-center text-brand-beige/80 text-sm">
                      <span className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Trending
                      </span>
                      <ArrowRight className="h-4 w-4 animate-bounce" />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-brand-beige/30 to-brand-gold/20 rounded-3xl backdrop-blur-sm border border-brand-gold/30 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-gold"></div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 animate-fade-in">
          {featuredProducts.map((_, index) => (
            <div 
              key={index}
              className={`h-1 rounded-full cursor-pointer transition-all ${
                index === currentProductIndex 
                  ? 'w-12 bg-brand-gold animate-pulse' 
                  : 'w-4 bg-brand-beige/50 hover:bg-brand-beige'
              }`}
              onClick={() => setCurrentProductIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
