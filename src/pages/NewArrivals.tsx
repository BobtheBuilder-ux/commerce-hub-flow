
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { Badge } from '@/components/ui/badge';

const NewArrivals = () => {
  // Mock data - in a real app, this would come from your database
  const newProducts = [
    {
      id: '1',
      name: 'Golden Honey Jar',
      price: 24.99,
      salePrice: 19.99,
      images: ['/placeholder.svg'],
      description: 'Premium organic honey',
      category: 'Food',
      inventory: 50,
      featured: true,
      reviews: [],
      averageRating: 4.5,
      createdAt: Date.now() - 1000000,
      updatedAt: Date.now() - 500000
    },
    {
      id: '2',
      name: 'Chocolate Truffle Set',
      price: 34.99,
      images: ['/placeholder.svg'],
      description: 'Artisan chocolate truffles',
      category: 'Food',
      inventory: 30,
      featured: false,
      reviews: [],
      averageRating: 4.3,
      createdAt: Date.now() - 2000000,
      updatedAt: Date.now() - 1000000
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="text-center mb-8">
          <Badge className="bg-brand-gold text-brand-chocolate mb-4">New Arrivals</Badge>
          <h1 className="text-3xl font-bold text-brand-chocolate">Latest Products</h1>
          <p className="text-gray-600 mt-2">Discover our newest additions to the collection</p>
        </div>
        
        <ProductGrid products={newProducts} />
      </main>
      
      <Footer />
    </div>
  );
};

export default NewArrivals;
