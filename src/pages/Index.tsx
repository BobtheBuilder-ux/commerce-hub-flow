import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types';
import ProductGrid from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
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
        // Fetch featured products
        const featuredQuery = query(collection(db, 'products'), where('featured', '==', true), limit(4));

        // Fetch new arrivals
        const newArrivalsQuery = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(8));
        const [featuredSnapshot, newArrivalsSnapshot] = await Promise.all([getDocs(featuredQuery), getDocs(newArrivalsQuery)]);
        const featuredItems: Product[] = [];
        featuredSnapshot.forEach(doc => {
          featuredItems.push({
            id: doc.id,
            ...doc.data()
          } as Product);
        });
        const newItems: Product[] = [];
        newArrivalsSnapshot.forEach(doc => {
          newItems.push({
            id: doc.id,
            ...doc.data()
          } as Product);
        });
        setFeaturedProducts(featuredItems);
        setNewArrivals(newItems);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Use sample data for demonstration
        setFeaturedProducts(sampleProducts.filter(p => p.featured).slice(0, 4));
        setNewArrivals(sampleProducts.slice(0, 8));
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white py-16">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Discover Amazing Products
              </h1>
              <p className="text-lg md:text-xl mb-6">
                Shop the latest trends with our curated selection of high-quality products
              </p>
              <div className="space-x-4">
                <Link to="/products">
                  <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100">
                    Shop Now
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button size="lg" variant="outline" className="border-white hover:bg-white/10 text-black">
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <img src="/placeholder.svg" alt="Shopping collection" className="rounded-lg shadow-xl max-w-full h-auto" />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <Link to="/products?featured=true" className="text-brand-purple hover:text-brand-purple-dark flex items-center">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <ProductGrid products={featuredProducts} isLoading={isLoading} />
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map(category => <Link key={category.id} to={`/categories/${category.id}`} className="group">
                  <div className="relative rounded-lg overflow-hidden bg-gray-100 h-40 md:h-56">
                    <img src={category.image || "/placeholder.svg"} alt={category.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center transition-opacity duration-300 group-hover:bg-opacity-30">
                      <h3 className="text-white text-xl md:text-2xl font-bold">{category.name}</h3>
                    </div>
                  </div>
                </Link>)}
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">New Arrivals</h2>
              <Link to="/new-arrivals" className="text-brand-purple hover:text-brand-purple-dark flex items-center">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <ProductGrid products={newArrivals} isLoading={isLoading} />
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-brand-purple-light">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive updates on new products, special offers, and exclusive discounts.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
              <input type="email" placeholder="Your email address" className="px-4 py-3 rounded-md focus:outline-none w-full" />
              <Button className="bg-brand-purple hover:bg-brand-purple-dark py-[25px] px-[20px]">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};

// Sample data for demonstration
const sampleProducts: Product[] = [{
  id: '1',
  name: 'Wireless Bluetooth Headphones',
  description: 'High-quality wireless headphones with noise cancellation',
  price: 89.99,
  salePrice: 69.99,
  images: ['/placeholder.svg'],
  category: 'Electronics',
  inventory: 23,
  featured: true,
  averageRating: 4.5,
  createdAt: Date.now() - 1000000,
  updatedAt: Date.now() - 500000
}, {
  id: '2',
  name: 'Smart Fitness Tracker',
  description: 'Track your health and fitness goals with this smart device',
  price: 59.99,
  images: ['/placeholder.svg'],
  category: 'Electronics',
  inventory: 15,
  featured: true,
  averageRating: 4.2,
  createdAt: Date.now() - 2000000,
  updatedAt: Date.now() - 1000000
}, {
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
  createdAt: Date.now() - 3000000,
  updatedAt: Date.now() - 1500000
}, {
  id: '4',
  name: 'Stainless Steel Water Bottle',
  description: 'Eco-friendly and durable water bottle',
  price: 19.99,
  images: ['/placeholder.svg'],
  category: 'Home & Kitchen',
  inventory: 35,
  featured: true,
  averageRating: 4.8,
  createdAt: Date.now() - 4000000,
  updatedAt: Date.now() - 2000000
}, {
  id: '5',
  name: 'Yoga Mat',
  description: 'Non-slip eco-friendly yoga mat',
  price: 29.99,
  images: ['/placeholder.svg'],
  category: 'Fitness',
  inventory: 20,
  featured: false,
  averageRating: 4.3,
  createdAt: Date.now() - 5000000,
  updatedAt: Date.now() - 3000000
}, {
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
  createdAt: Date.now() - 6000000,
  updatedAt: Date.now() - 3500000
}, {
  id: '7',
  name: 'Laptop Backpack',
  description: 'Waterproof backpack with laptop compartment',
  price: 39.99,
  images: ['/placeholder.svg'],
  category: 'Bags',
  inventory: 18,
  featured: false,
  averageRating: 4.7,
  createdAt: Date.now() - 7000000,
  updatedAt: Date.now() - 4000000
}, {
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
  createdAt: Date.now() - 8000000,
  updatedAt: Date.now() - 4500000
}];
const categories = [{
  id: 'electronics',
  name: 'Electronics',
  image: '/placeholder.svg'
}, {
  id: 'clothing',
  name: 'Clothing',
  image: '/placeholder.svg'
}, {
  id: 'home-kitchen',
  name: 'Home & Kitchen',
  image: '/placeholder.svg'
}, {
  id: 'fitness',
  name: 'Fitness',
  image: '/placeholder.svg'
}];
export default Index;