
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Latest gadgets and devices',
    image: '/placeholder.svg',
    productCount: 24
  },
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'Fashion and apparel',
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
    description: 'Workout equipment and gear',
    image: '/placeholder.svg',
    productCount: 12
  },
  {
    id: 'books',
    name: 'Books',
    description: 'Educational and entertainment',
    image: '/placeholder.svg',
    productCount: 28
  },
  {
    id: 'beauty',
    name: 'Beauty',
    description: 'Cosmetics and skincare',
    image: '/placeholder.svg',
    productCount: 15
  }
];

const ShopByCategory = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of products across different categories
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/categories/${category.id}`}
              className="group block"
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.productCount}+ Products</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link to="/categories">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-medium transition-colors duration-300">
              View All Categories
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
