import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, query, getDocs, where, orderBy, limit, startAfter, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { SearchIcon, FilterX } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();
  const PRODUCTS_PER_PAGE = 12;

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
    
    // Reset products when filters change
    setProducts([]);
    setLastVisible(null);
    setHasMore(true);
  }, [location.search]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Build query based on filters
        let productsQuery = collection(db, 'products');
        let queryConstraints = [];
        
        // Apply category filter
        if (selectedCategories.length > 0) {
          queryConstraints.push(where('category', 'in', selectedCategories));
        }
        
        // Apply stock filter
        if (showOnlyInStock) {
          queryConstraints.push(where('inventory', '>', 0));
        }
        
        // Apply price range filter (client-side filter for now)
        
        // Apply sorting
        switch (sortBy) {
          case 'featured':
            queryConstraints.push(where('featured', '==', true));
            queryConstraints.push(orderBy('createdAt', 'desc'));
            break;
          case 'price-low':
            queryConstraints.push(orderBy('price', 'asc'));
            break;
          case 'price-high':
            queryConstraints.push(orderBy('price', 'desc'));
            break;
          case 'newest':
            queryConstraints.push(orderBy('createdAt', 'desc'));
            break;
          default:
            queryConstraints.push(orderBy('createdAt', 'desc'));
        }
        
        // Apply pagination
        queryConstraints.push(limit(PRODUCTS_PER_PAGE));
        if (lastVisible) {
          queryConstraints.push(startAfter(lastVisible));
        }
        
        const q = query(productsQuery, ...queryConstraints);
        const querySnapshot = await getDocs(q);
        
        // Process results
        const newProducts: Product[] = [];
        querySnapshot.forEach((doc) => {
          newProducts.push({ id: doc.id, ...doc.data() } as Product);
        });
        
        // Apply client-side search filter
        const filteredProducts = searchQuery 
          ? newProducts.filter(p => 
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
              p.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : newProducts;
        
        // Apply price range filter (client-side)
        const priceFilteredProducts = filteredProducts.filter(
          p => p.price >= priceRange[0] && p.price <= priceRange[1]
        );

        setProducts(prev => lastVisible ? [...prev, ...priceFilteredProducts] : priceFilteredProducts);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
        setHasMore(querySnapshot.docs.length === PRODUCTS_PER_PAGE);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Use sample data for demonstration
        setProducts(sampleProducts);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategories, sortBy, showOnlyInStock, priceRange, lastVisible, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search parameters
    const params = new URLSearchParams();
    if (searchQuery) params.set('query', searchQuery);
    if (selectedCategories.length) params.set('category', selectedCategories[0]);
    if (sortBy) params.set('sort', sortBy);

    navigate(`/products?${params.toString()}`);
  };

  const handleLoadMore = () => {
    // Trigger next page load
    if (hasMore && !isLoading) {
      fetchMoreProducts();
    }
  };

  const fetchMoreProducts = async () => {
    // This will trigger the useEffect that loads products
    // since lastVisible is a dependency and we're keeping the same filters
  };

  const clearFilters = () => {
    navigate('/products');
    setSearchQuery('');
    setSortBy('featured');
    setPriceRange([0, 500]);
    setSelectedCategories([]);
    setShowOnlyInStock(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8">Shop Our Products</h1>
        
        {/* Search and Filter Section */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
          
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Sort Options */}
            <div className="w-full md:w-48">
              <Select 
                value={sortBy} 
                onValueChange={setSortBy}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Category Filter */}
            <div className="w-full md:w-56">
              <Select 
                value={selectedCategories[0] || ''} 
                onValueChange={(value) => setSelectedCategories(value ? [value] : [])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="home-kitchen">Home & Kitchen</SelectItem>
                  <SelectItem value="fitness">Fitness</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Stock Filter */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="inStock" 
                checked={showOnlyInStock}
                onCheckedChange={(checked) => setShowOnlyInStock(!!checked)}
              />
              <label htmlFor="inStock" className="text-sm font-medium">
                In stock only
              </label>
            </div>
            
            {/* Clear Filters */}
            {(searchQuery || selectedCategories.length > 0 || sortBy !== 'featured' || showOnlyInStock) && (
              <Button variant="outline" onClick={clearFilters} className="flex items-center">
                <FilterX className="mr-2 h-4 w-4" /> Clear Filters
              </Button>
            )}
          </div>
          
          {/* Price Range Slider */}
          <div className="mb-2">
            <h3 className="text-sm font-medium mb-2">Price Range: ${priceRange[0]} - ${priceRange[1]}</h3>
            <Slider 
              defaultValue={[0, 500]} 
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-6"
            />
          </div>
          
          {/* Active Filters */}
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: {searchQuery}
              </Badge>
            )}
            {selectedCategories.map(category => (
              <Badge key={category} variant="secondary" className="flex items-center gap-1">
                {category}
              </Badge>
            ))}
            {sortBy !== 'featured' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Sort: {sortBy.replace('-', ' to ')}
              </Badge>
            )}
            {showOnlyInStock && (
              <Badge variant="secondary" className="flex items-center gap-1">
                In Stock Only
              </Badge>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {isLoading && products.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <p>Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <>
            <ProductGrid products={products} />
            
            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-8">
                <Button 
                  onClick={handleLoadMore} 
                  variant="outline"
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Load More Products'}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No products found matching your criteria.</p>
            <Button variant="outline" onClick={clearFilters} className="mt-4">
              Clear Filters
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

// Sample data for fallback
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 89.99,
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
    name: 'Smart Watch',
    description: 'Advanced smartwatch with health tracking features',
    price: 129.99,
    images: ['/placeholder.svg'],
    category: 'Electronics',
    inventory: 15,
    featured: false,
    averageRating: 4.3,
    reviews: [],
    createdAt: Date.now() - 2000000,
    updatedAt: Date.now() - 1000000
  }
];

export default Products;
