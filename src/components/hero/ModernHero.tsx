import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart, Star, Zap, TrendingUp } from 'lucide-react';
const ModernHero = () => {
  return <section className="relative min-h-screen bg-gradient-to-br from-brand-chocolate via-brand-bronze to-brand-chocolate-dark overflow-hidden">
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

            {/* Subheading */}
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center space-x-4">
                <TrendingUp className="h-6 w-6 text-brand-gold animate-bounce" />
                <h2 className="text-2xl lg:text-3xl font-bold">
                  PREMIUM QUALITY, UNMATCHED STYLE
                </h2>
              </div>
              <div className="border-l-4 border-brand-gold pl-6 bg-brand-chocolate/20 backdrop-blur-sm rounded-r-lg py-3">
                <h3 className="text-xl lg:text-2xl font-semibold text-brand-beige">
                  Discover curated collections that define excellence
                </h3>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 animate-fade-in">
              <Link to="/products?featured=true">
                <Button size="lg" className="bg-brand-gold hover:bg-brand-gold-dark text-brand-chocolate font-bold px-10 py-4 rounded-xl text-lg shadow-2xl hover:shadow-brand-gold/50 transition-all duration-300 hover:scale-105">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Shop Premium
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

          {/* Right Content - Product Showcase */}
          <div className="relative animate-fade-in">
            {/* Main Product Image */}
            <div className="relative z-20">
              <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-brand-beige/30 to-brand-gold/20 rounded-3xl backdrop-blur-sm border border-brand-gold/30 flex items-center justify-center overflow-hidden shadow-2xl hover:shadow-brand-gold/30 transition-all duration-500 hover:scale-105">
                <div className="relative">
                  <img src="/placeholder.svg" alt="Featured Product" className="w-80 h-80 object-cover rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-500" />
                  <div className="absolute -top-4 -right-4 bg-brand-gold text-brand-chocolate px-3 py-1 rounded-full text-sm font-bold animate-bounce">
                    NEW!
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-gold/30 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-bronze/30 rounded-full blur-xl animate-pulse"></div>
            </div>

            {/* Side Cards */}
            <div className="absolute top-8 -right-8 lg:right-8 bg-brand-beige/20 backdrop-blur-md rounded-2xl p-6 border border-brand-gold/30 w-64 animate-slide-in-right">
              <h4 className="text-brand-cream font-bold text-lg mb-2">Premium Selection</h4>
              <div className="w-full h-32 bg-gradient-to-br from-brand-gold/40 to-brand-bronze/30 rounded-xl mb-4 flex items-center justify-center">
                <img src="/placeholder.svg" alt="Premium Product" className="w-24 h-24 object-cover rounded-lg" />
              </div>
              <div className="flex justify-between items-center text-brand-beige/80 text-sm">
                <span className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  4.9 Rating
                </span>
                <ArrowRight className="h-4 w-4 animate-bounce" />
              </div>
            </div>

            <div className="absolute bottom-8 -left-8 lg:left-8 bg-brand-chocolate/20 backdrop-blur-md rounded-2xl p-6 border border-brand-gold/30 w-64 animate-slide-in-right">
              <h4 className="text-brand-cream font-bold text-lg mb-2">Best Sellers</h4>
              <div className="w-full h-32 bg-gradient-to-br from-brand-bronze/40 to-brand-gold/30 rounded-xl mb-4 flex items-center justify-center">
                <img src="/placeholder.svg" alt="Best Seller" className="w-24 h-24 object-cover rounded-lg" />
              </div>
              <div className="flex justify-between items-center text-brand-beige/80 text-sm">
                <span className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Trending
                </span>
                <ArrowRight className="h-4 w-4 animate-bounce" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 animate-fade-in">
          <div className="w-12 h-1 bg-brand-gold rounded-full animate-pulse"></div>
          <div className="w-4 h-1 bg-brand-beige/50 rounded-full hover:bg-brand-beige transition-colors cursor-pointer"></div>
          <div className="w-4 h-1 bg-brand-beige/50 rounded-full hover:bg-brand-beige transition-colors cursor-pointer"></div>
          <div className="w-4 h-1 bg-brand-beige/50 rounded-full hover:bg-brand-beige transition-colors cursor-pointer"></div>
        </div>
      </div>
    </section>;
};
export default ModernHero;