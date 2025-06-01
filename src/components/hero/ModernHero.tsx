
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart } from 'lucide-react';

const ModernHero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-orange-400/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <div className="space-y-8 text-white">
            {/* Badge */}
            <div className="inline-flex items-center bg-orange-500/20 border border-orange-400/30 rounded-full px-4 py-2">
              <span className="text-orange-300 font-medium text-sm">NEW '25</span>
              <div className="ml-3 flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-400 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-400 border-2 border-white"></div>
              </div>
              <ArrowRight className="ml-2 h-4 w-4 text-orange-300" />
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-8xl font-bold leading-tight">
                FROM{' '}
                <span className="bg-gradient-to-r from-blue-400 via-white to-orange-400 bg-clip-text text-transparent">
                  FROZEN
                </span>
              </h1>
              <h1 className="text-6xl lg:text-8xl font-bold leading-tight">
                PEAKS TO{' '}
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  CITY
                </span>
              </h1>
              <h1 className="text-6xl lg:text-8xl font-bold leading-tight text-gray-100">
                STREETS
              </h1>
            </div>

            {/* Subheading */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <ArrowRight className="h-6 w-6 text-orange-400" />
                <h2 className="text-2xl lg:text-3xl font-bold">
                  MOVE THROUGH THE STORM
                </h2>
              </div>
              <div className="border-l-4 border-orange-400 pl-4">
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-300">
                  IN PRODUCTS MADE FOR LEGENDS
                </h3>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Link to="/products?category=Electronics">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl text-lg">
                  For Tech Lovers
                </Button>
              </Link>
              <Link to="/products?category=Clothing">
                <Button size="lg" variant="outline" className="border-2 border-white hover:bg-white hover:text-slate-900 text-white font-bold px-8 py-4 rounded-xl text-lg">
                  For Style Icons
                </Button>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="pt-4 text-sm text-gray-400">
              <p>Join us this new season as we push boundaries, break limits</p>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative">
            {/* Main Product Image */}
            <div className="relative z-20">
              <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-blue-200/20 to-orange-200/20 rounded-3xl backdrop-blur-sm border border-white/10 flex items-center justify-center overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Featured Product" 
                  className="w-80 h-80 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500" 
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-400/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>
            </div>

            {/* Side Card */}
            <div className="absolute top-8 -right-8 lg:right-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-64">
              <h4 className="text-white font-bold text-lg mb-2">Freedom of movement</h4>
              <div className="w-full h-32 bg-gradient-to-br from-orange-400/30 to-blue-400/30 rounded-xl mb-4 flex items-center justify-center">
                <img 
                  src="/placeholder.svg" 
                  alt="Movement Demo" 
                  className="w-24 h-24 object-cover rounded-lg" 
                />
              </div>
              <div className="flex justify-between items-center text-white/60 text-sm">
                <span>01 / 04</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div className="w-12 h-1 bg-orange-400 rounded-full"></div>
          <div className="w-4 h-1 bg-white/30 rounded-full"></div>
          <div className="w-4 h-1 bg-white/30 rounded-full"></div>
          <div className="w-4 h-1 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
