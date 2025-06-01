
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types';
import ProductGrid from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, ShoppingCart, Users } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Use sample data for demonstration
        setFeaturedProducts(sampleProducts.filter(p => p.featured).slice(0, 4));
        setNewArrivals(sampleProducts.slice(0, 8));
      } catch (error) {
        console.error('Error fetching products:', error);
        setFeaturedProducts(sampleProducts.filter(p => p.featured).slice(0, 4));
        setNewArrivals(sampleProducts.slice(0, 8));
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
        {/* Hero Banner */}
        <section className="chocolate-gradient text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  Discover
                  <span className="block text-brand-gold">Golden</span>
                  Treasures
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-brand-beige-light max-w-2xl">
                  Curated collection of premium products with exceptional quality and timeless elegance
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link to="/products">
                    <Button size="lg" className="bg-brand-gold text-brand-chocolate hover:bg-brand-gold-dark font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      Shop Now
                      <ShoppingCart className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/categories">
                    <Button size="lg" variant="outline" className="border-2 border-white hover:bg-white hover:text-brand-chocolate text-white font-semibold px-8 py-4 rounded-xl">
                      Browse Categories
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-brand-gold via-brand-amber to-brand-bronze shadow-2xl flex items-center justify-center">
                    <img 
                      src="/placeholder.svg" 
                      alt="Premium Collection" 
                      className="w-64 h-64 lg:w-80 lg:h-80 object-cover rounded-full shadow-xl border-4 border-white" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
              <Link to="/products?featured=true">
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
                <Link key={category.id} to={`/categories/${category.id}`} className="group">
                  <div className="relative rounded-xl overflow-hidden bg-white shadow-lg h-48 md:h-64 border border-brand-beige-dark">
                    <img 
                      src={category.image || "/placeholder.svg"} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-chocolate via-transparent to-transparent opacity-80 flex items-end justify-center p-4 transition-opacity duration-300 group-hover:opacity-90">
                      <h3 className="text-white text-xl md:text-2xl font-bold text-center">{category.name}</h3>
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
              <Link to="/new-arrivals">
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

// Sample data for demonstration
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 89.99,
    salePrice: 69.99,
    images: ['/placeholder.svg'],
    category: 'Electronics',
    inventory: 23,
    featured: true,
    averageRating: 4.5,
    reviews: [],
    createdAt: Date.now() - 1000000,
    updatedAt: Date.now() - 500000
  },
  {
    id: '2',
    name: 'Smart Fitness Tracker',
    description: 'Track your health and fitness goals with this smart device',
    price: 59.99,
    images: ['/placeholder.svg'],
    category: 'Electronics',
    inventory: 15,
    featured: true,
    averageRating: 4.2,
    reviews: [],
    createdAt: Date.now() - 2000000,
    updatedAt: Date.now() - 1000000
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and eco-friendly cotton t-shirt',
    price: 24.99,
    salePrice: 19.99,
    images: ['/placeholder.svg'],
    category: 'Clothing',
    inventory: 50,
    featured: false,
    averageRating: 4.0,
    reviews: [],
    createdAt: Date.now() - 3000000,
    updatedAt: Date.now() - 1500000
  },
  {
    id: '4',
    name: 'Stainless Steel Water Bottle',
    description: 'Eco-friendly and durable water bottle',
    price: 19.99,
    images: ['/placeholder.svg'],
    category: 'Home & Kitchen',
    inventory: 35,
    featured: true,
    averageRating: 4.8,
    reviews: [],
    createdAt: Date.now() - 4000000,
    updatedAt: Date.now() - 2000000
  },
  {
    id: '5',
    name: 'Yoga Mat',
    description: 'Non-slip eco-friendly yoga mat',
    price: 29.99,
    images: ['/placeholder.svg'],
    category: 'Fitness',
    inventory: 20,
    featured: false,
    averageRating: 4.3,
    reviews: [],
    createdAt: Date.now() - 5000000,
    updatedAt: Date.now() - 3000000
  },
  {
    id: '6',
    name: 'Coffee Maker',
    description: 'Automatic drip coffee maker with timer',
    price: 49.99,
    salePrice: 39.99,
    images: ['/placeholder.svg'],
    category: 'Home & Kitchen',
    inventory: 12,
    featured: true,
    averageRating: 4.1,
    reviews: [],
    createdAt: Date.now() - 6000000,
    updatedAt: Date.now() - 3500000
  },
  {
    id: '7',
    name: 'Laptop Backpack',
    description: 'Waterproof backpack with laptop compartment',
    price: 39.99,
    images: ['/placeholder.svg'],
    category: 'Bags',
    inventory: 18,
    featured: false,
    averageRating: 4.7,
    reviews: [],
    createdAt: Date.now() - 7000000,
    updatedAt: Date.now() - 4000000
  },
  {
    id: '8',
    name: 'Smartphone Case',
    description: 'Protective case for latest smartphone models',
    price: 14.99,
    salePrice: 9.99,
    images: ['/placeholder.svg'],
    category: 'Electronics',
    inventory: 40,
    featured: false,
    averageRating: 4.0,
    reviews: [],
    createdAt: Date.now() - 8000000,
    updatedAt: Date.now() - 4500000
  }
];

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    image: '/placeholder.svg'
  },
  {
    id: 'clothing',
    name: 'Clothing',
    image: '/placeholder.svg'
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    image: '/placeholder.svg'
  },
  {
    id: 'fitness',
    name: 'Fitness',
    image: '/placeholder.svg'
  }
];

export default Index;
