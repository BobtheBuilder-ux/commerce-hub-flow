import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types';
import ProductGrid from '@/components/product/ProductGrid';
import ProductFilters from '@/components/product/ProductFilters';
import SearchBar from '@/components/product/SearchBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showOnSale, setShowOnSale] = useState(false);
  const [showInStock, setShowInStock] = useState(false);

  // Sample products data
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

  const categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Fitness', 'Bags'];

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Use sample data for demonstration
        setProducts(sampleProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts(sampleProducts);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      const matchesSale = !showOnSale || product.salePrice;
      const matchesStock = !showInStock || product.inventory > 0;

      return matchesSearch && matchesCategory && matchesPrice && matchesSale && matchesStock;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.salePrice || a.price) - (b.salePrice || b.price);
        case 'price-high':
          return (b.salePrice || b.price) - (a.salePrice || a.price);
        case 'rating':
          return b.averageRating - a.averageRating;
        case 'newest':
          return b.createdAt - a.createdAt;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy, priceRange, showOnSale, showInStock]);

  // Handle URL parameters
  useEffect(() => {
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const sale = searchParams.get('sale');
    
    if (featured === 'true') {
      setFilteredProducts(products.filter(p => p.featured));
    }
    if (category) {
      setSelectedCategory(category);
    }
    if (sale === 'true') {
      setShowOnSale(true);
    }
  }, [searchParams, products]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('name');
    setPriceRange({ min: 0, max: 1000 });
    setShowOnSale(false);
    setShowInStock(false);
    setSearchParams({});
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-1/4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>

                {/* Search */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Search</label>
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <Separator />

                  {/* Category */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Price Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Quick Filters */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Quick Filters</label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="on-sale"
                        checked={showOnSale}
                        onCheckedChange={(checked) => setShowOnSale(Boolean(checked))}
                      />
                      <label htmlFor="on-sale" className="text-sm">On Sale</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="in-stock"
                        checked={showInStock}
                        onCheckedChange={(checked) => setShowInStock(Boolean(checked))}
                      />
                      <label htmlFor="in-stock" className="text-sm">In Stock</label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-brand-chocolate mb-2">Products</h1>
                <p className="text-gray-600">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>
              
              {/* Sort */}
              <div className="mt-4 sm:mt-0">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="price-low">Price (Low to High)</SelectItem>
                    <SelectItem value="price-high">Price (High to Low)</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filters */}
            {(searchTerm || selectedCategory || showOnSale || showInStock) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchTerm && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Search: {searchTerm}
                    <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-red-500">×</button>
                  </Badge>
                )}
                {selectedCategory && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Category: {selectedCategory}
                    <button onClick={() => setSelectedCategory('')} className="ml-1 hover:text-red-500">×</button>
                  </Badge>
                )}
                {showOnSale && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    On Sale
                    <button onClick={() => setShowOnSale(false)} className="ml-1 hover:text-red-500">×</button>
                  </Badge>
                )}
                {showInStock && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    In Stock
                    <button onClick={() => setShowInStock(false)} className="ml-1 hover:text-red-500">×</button>
                  </Badge>
                )}
              </div>
            )}

            {/* Products */}
            <ProductGrid products={filteredProducts} isLoading={isLoading} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
