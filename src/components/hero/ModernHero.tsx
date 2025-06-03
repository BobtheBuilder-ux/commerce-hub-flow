
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { fetchDummyJSONProducts } from '@/services/dummyJsonService';
import { Product } from '@/types';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

const ModernHero = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await fetchDummyJSONProducts(50);
        const featured = products.filter(product => product.featured).slice(0, 3);
        if (featured.length > 0) {
          setFeaturedProducts(featured);
        } else {
          // If no featured products, take first 3
          setFeaturedProducts(products.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    if (featuredProducts.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === featuredProducts.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [featuredProducts.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === featuredProducts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredProducts.length - 1 : prevIndex - 1
    );
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  if (isLoading) {
    return (
      <section className="relative bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            </div>
            <div className="relative">
              <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentProduct = featuredProducts[currentIndex];

  return (
    <section className="relative bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            {currentProduct ? (
              <>
                <div className="space-y-4">
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    Featured Product {currentIndex + 1} of {featuredProducts.length}
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                    {currentProduct.name}
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                    {currentProduct.description}
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${
                            i < Math.floor(currentProduct.averageRating || 0) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                      <span className="text-gray-600 ml-2">
                        ({currentProduct.averageRating?.toFixed(1) || 'N/A'})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {currentProduct.salePrice ? (
                      <>
                        <span className="text-3xl font-bold text-orange-600">
                          ${currentProduct.salePrice.toFixed(2)}
                        </span>
                        <span className="text-xl text-gray-500 line-through">
                          ${currentProduct.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-gray-900">
                        ${currentProduct.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    onClick={() => handleAddToCart(currentProduct)}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Link to={`/products/${currentProduct.id}`}>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-4 text-lg rounded-full transition-all duration-300"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    Welcome to Our Store
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                    Discover Amazing Products
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                    Shop our curated collection of premium products at unbeatable prices.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Shop Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-4 text-lg rounded-full transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Hero Image with Navigation */}
          <div className="relative">
            <div className="relative z-10">
              {currentProduct ? (
                <img 
                  src={currentProduct.images[0]} 
                  alt={currentProduct.name}
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-orange-200 to-amber-200 rounded-2xl shadow-2xl flex items-center justify-center">
                  <ShoppingCart className="h-24 w-24 text-orange-600" />
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            {featuredProducts.length > 1 && (
              <>
                <Button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg"
                  size="sm"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg"
                  size="sm"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Slide Indicators */}
            {featuredProducts.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {featuredProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-orange-600 w-8' 
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            )}
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-400 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-amber-400 rounded-full opacity-10 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
