
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { Badge } from '@/components/ui/badge';

const FeaturedProducts = () => {
  // Mock data - in a real app, this would come from your database
  const featuredProducts = [
    {
      id: '1',
      name: 'Premium Gold Jewelry',
      price: 199.99,
      images: ['/placeholder.svg'],
      description: 'Beautiful gold jewelry piece',
      category: 'Jewelry',
      inventory: 10,
      featured: true
    },
    {
      id: '2',
      name: 'Chocolate Gift Box',
      price: 49.99,
      images: ['/placeholder.svg'],
      description: 'Luxury chocolate gift set',
      category: 'Food',
      inventory: 25,
      featured: true
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="text-center mb-8">
          <Badge className="bg-brand-chocolate text-white mb-4">Featured</Badge>
          <h1 className="text-3xl font-bold text-brand-chocolate">Featured Products</h1>
          <p className="text-gray-600 mt-2">Our hand-picked selection of premium items</p>
        </div>
        
        <ProductGrid products={featuredProducts} />
      </main>
      
      <Footer />
    </div>
  );
};

export default FeaturedProducts;
