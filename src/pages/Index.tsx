
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import ProductGrid from '@/components/product/ProductGrid';
import ModernHero from '@/components/hero/ModernHero';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, ShoppingCart, Users } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { fetchDummyJSONProducts, fetchDummyJSONCategories } from '@/services/dummyJsonService';

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const [products, categoriesData] = await Promise.all([
          fetchDummyJSONProducts(50),
          fetchDummyJSONCategories()
        ]);
        
        setFeaturedProducts(products.filter(p => p.featured).slice(0, 4));
        setNewArrivals(products.slice(0, 8));
        // Filter and ensure categories are strings
        const validCategories = categoriesData
          .filter(category => typeof category === 'string' && category.length > 0)
          .slice(0, 4);
        setCategories(validCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
        setFeaturedProducts([]);
        setNewArrivals([]);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Modern Hero Section */}
        <ModernHero />

        {/* Features Section */}
        <section className="py-16 bg-gradient-to-br from-brand-beige-light to-brand-cream">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-brand-beige-dark">
                <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-brand-chocolate" />
                </div>
                <h3 className="text-xl font-semibold text-brand-chocolate mb-2">Premium Quality</h3>
                <p className="text-brand-chocolate-light">Carefully selected products with exceptional craftsmanship</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-brand-beige-dark">
                <div className="w-16 h-16 bg-brand-chocolate rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-brand-chocolate mb-2">Fast Shipping</h3>
                <p className="text-brand-chocolate-light">Quick and secure delivery to your doorstep</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-brand-beige-dark">
                <div className="w-16 h-16 bg-brand-bronze rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-brand-chocolate mb-2">Expert Support</h3>
                <p className="text-brand-chocolate-light">Dedicated customer service team ready to help</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-brand-chocolate mb-4">Featured Products</h2>
              <p className="text-brand-chocolate-light text-lg max-w-2xl mx-auto">
                Discover our handpicked selection of premium items
              </p>
            </div>
            <ProductGrid products={featuredProducts} isLoading={isLoading} />
            <div className="text-center mt-12">
              <Link to="/products">
                <Button className="bg-brand-chocolate hover:bg-brand-chocolate-dark text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  View All Featured Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20 bg-gradient-to-br from-brand-beige to-brand-beige-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-brand-chocolate mb-4">Shop by Category</h2>
              <p className="text-brand-chocolate-light text-lg">Find exactly what you're looking for</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map(category => (
                <Link key={category} to={`/products?category=${category}`} className="group">
                  <div className="relative rounded-xl overflow-hidden bg-white shadow-lg h-48 md:h-64 border border-brand-beige-dark">
                    <img 
                      src="/placeholder.svg" 
                      alt={category} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-chocolate via-transparent to-transparent opacity-80 flex items-end justify-center p-4 transition-opacity duration-300 group-hover:opacity-90">
                      <h3 className="text-white text-xl md:text-2xl font-bold text-center">
                        {String(category).charAt(0).toUpperCase() + String(category).slice(1)}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-brand-chocolate mb-4">New Arrivals</h2>
              <p className="text-brand-chocolate-light text-lg max-w-2xl mx-auto">
                Be the first to discover our latest additions
              </p>
            </div>
            <ProductGrid products={newArrivals} isLoading={isLoading} />
            <div className="text-center mt-12">
              <Link to="/products">
                <Button className="bg-brand-gold hover:bg-brand-gold-dark text-brand-chocolate font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  View All New Arrivals
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 chocolate-gradient text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl font-bold mb-6">Stay in the Golden Loop</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-brand-beige-light">
              Subscribe to our newsletter for exclusive offers, new arrivals, and premium insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="px-6 py-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-gold flex-grow text-brand-chocolate" 
              />
              <Button className="bg-brand-gold hover:bg-brand-gold-dark text-brand-chocolate font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
