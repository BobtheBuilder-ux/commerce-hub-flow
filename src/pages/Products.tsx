
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product } from '@/types';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import SearchBar from '@/components/product/SearchBar';
import ProductFilters from '@/components/product/ProductFilters';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('query');
    const categoryParam = params.get('category');
    const sortParam = params.get('sort');
    const featuredParam = params.get('featured');
    
    if (queryParam) setSearchQuery(queryParam);
    if (categoryParam) setSelectedCategories([categoryParam]);
    if (sortParam) setSortBy(sortParam);
    if (featuredParam === 'true') setSortBy('featured');
  }, [location.search]);

  // Load sample products
  useEffect(() => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setProducts(sampleProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category.toLowerCase())
      );
    }

    // Apply price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply stock filter
    if (showOnlyInStock) {
      filtered = filtered.filter(product => product.inventory > 0);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, searchQuery, selectedCategories, priceRange, showOnlyInStock, sortBy]);

  const handleSearch = () => {
    // Update URL with search parameters
    const params = new URLSearchParams();
    if (searchQuery) params.set('query', searchQuery);
    if (selectedCategories.length) params.set('category', selectedCategories[0]);
    if (sortBy) params.set('sort', sortBy);
    navigate(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSortBy('featured');
    setPriceRange([0, 500]);
    setSelectedCategories([]);
    setShowOnlyInStock(false);
    navigate('/products');
  };

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || sortBy !== 'featured' || showOnlyInStock || priceRange[0] !== 0 || priceRange[1] !== 500;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-brand-chocolate mb-4">Shop Our Products</h1>
          <p className="text-brand-chocolate-light text-lg mb-6">Discover our carefully curated collection</p>
        </div>
        
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={handleSearch}
          />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="lg:hidden mb-4">
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="w-full border-brand-chocolate text-brand-chocolate"
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
            
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <ProductFilters
                sortBy={sortBy}
                setSortBy={setSortBy}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                showOnlyInStock={showOnlyInStock}
                setShowOnlyInStock={setShowOnlyInStock}
                onClearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchQuery && (
                  <Badge variant="secondary" className="bg-brand-gold text-brand-chocolate">
                    Search: {searchQuery}
                  </Badge>
                )}
                {selectedCategories.map(category => (
                  <Badge key={category} variant="secondary" className="bg-brand-chocolate text-white">
                    Category: {category}
                  </Badge>
                ))}
                {sortBy !== 'featured' && (
                  <Badge variant="secondary" className="bg-brand-beige text-brand-chocolate">
                    Sort: {sortBy.replace('-', ' to ')}
                  </Badge>
                )}
                {showOnlyInStock && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    In Stock Only
                  </Badge>
                )}
              </div>
            )}

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-brand-chocolate">
                {isLoading ? 'Loading...' : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`}
              </p>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <ProductGrid products={[]} isLoading={true} />
            ) : filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-brand-chocolate mb-4">No products found</h3>
                <p className="text-brand-chocolate-light mb-6">Try adjusting your search or filters</p>
                <Button 
                  onClick={clearFilters}
                  className="bg-brand-gold hover:bg-brand-gold-dark text-brand-chocolate"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Enhanced sample data with more products for better testing
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
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
    name: 'Smart Fitness Watch',
    description: 'Advanced smartwatch with health tracking, GPS, and long battery life.',
    price: 129.99,
    images: ['/placeholder.svg'],
    category: 'Electronics',
    inventory: 15,
    featured: false,
    averageRating: 4.3,
    reviews: [],
    createdAt: Date.now() - 2000000,
    updatedAt: Date.now() - 1000000
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and eco-friendly organic cotton t-shirt in various colors.',
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
    description: 'Eco-friendly and durable stainless steel water bottle with temperature control.',
    price: 19.99,
    images: ['/placeholder.svg'],
    category: 'Home-Kitchen',
    inventory: 35,
    featured: true,
    averageRating: 4.8,
    reviews: [],
    createdAt: Date.now() - 4000000,
    updatedAt: Date.now() - 2000000
  },
  {
    id: '5',
    name: 'Premium Yoga Mat',
    description: 'Non-slip eco-friendly yoga mat with superior grip and cushioning.',
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
    name: 'Artisan Coffee Beans',
    description: 'Premium single-origin coffee beans roasted to perfection.',
    price: 18.99,
    images: ['/placeholder.svg'],
    category: 'Food',
    inventory: 45,
    featured: true,
    averageRating: 4.7,
    reviews: [],
    createdAt: Date.now() - 6000000,
    updatedAt: Date.now() - 3500000
  },
  {
    id: '7',
    name: 'Gold Pendant Necklace',
    description: 'Elegant 14k gold pendant necklace with premium craftsmanship.',
    price: 299.99,
    salePrice: 249.99,
    images: ['/placeholder.svg'],
    category: 'Jewelry',
    inventory: 8,
    featured: true,
    averageRating: 4.9,
    reviews: [],
    createdAt: Date.now() - 7000000,
    updatedAt: Date.now() - 4000000
  },
  {
    id: '8',
    name: 'Leather Laptop Bag',
    description: 'Professional leather laptop bag with multiple compartments.',
    price: 79.99,
    images: ['/placeholder.svg'],
    category: 'Accessories',
    inventory: 12,
    featured: false,
    averageRating: 4.4,
    reviews: [],
    createdAt: Date.now() - 8000000,
    updatedAt: Date.now() - 4500000
  }
];

export default Products;
