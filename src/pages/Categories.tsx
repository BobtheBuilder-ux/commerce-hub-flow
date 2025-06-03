
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';

interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  productCount?: number;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        // Use sample data instead of Firebase for now
        setCategories(sampleCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories(sampleCategories);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8">Product Categories</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <p>Loading categories...</p>
          </div>
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={`/categories/${category.id}`}
                className="block group"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <img
                      src={category.image || '/placeholder.svg'}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                      <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-gray-600 text-sm">{category.description || `Browse our selection of ${category.name}`}</p>
                    <p className="text-sm font-medium text-brand-purple mt-2">
                      {category.productCount || '10'}+ Products
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No categories found.</p>
            <Link to="/products" className="text-brand-purple hover:underline mt-2 block">
              Browse all products instead
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

// Sample data for fallback
const sampleCategories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Latest gadgets and electronic devices',
    image: '/placeholder.svg',
    productCount: 24
  },
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'Trendy fashion and apparel',
    image: '/placeholder.svg',
    productCount: 36
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    description: 'Everything for your home',
    image: '/placeholder.svg',
    productCount: 18
  },
  {
    id: 'fitness',
    name: 'Fitness',
    description: 'Equipment and accessories for your workouts',
    image: '/placeholder.svg',
    productCount: 12
  }
];

export default Categories;
