
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { Badge } from '@/components/ui/badge';

const Sale = () => {
  // Mock data - in a real app, this would come from your database
  const saleProducts = [
    {
      id: '1',
      name: 'Golden Honey Jar',
      price: 24.99,
      salePrice: 19.99,
      images: ['/placeholder.svg'],
      description: 'Premium organic honey',
      category: 'Food',
      inventory: 50,
      featured: false,
      reviews: [],
      averageRating: 4.5,
      createdAt: Date.now() - 1000000,
      updatedAt: Date.now() - 500000
    },
    {
      id: '2',
      name: 'Chocolate Collection',
      price: 59.99,
      salePrice: 39.99,
      images: ['/placeholder.svg'],
      description: 'Assorted chocolate collection',
      category: 'Food',
      inventory: 20,
      featured: false,
      reviews: [],
      averageRating: 4.2,
      createdAt: Date.now() - 2000000,
      updatedAt: Date.now() - 1000000
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="text-center mb-8">
          <Badge className="bg-red-500 text-white mb-4">Sale</Badge>
          <h1 className="text-3xl font-bold text-brand-chocolate">Special Offers</h1>
          <p className="text-gray-600 mt-2">Limited time deals on selected items</p>
        </div>
        
        <ProductGrid products={saleProducts} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Sale;
