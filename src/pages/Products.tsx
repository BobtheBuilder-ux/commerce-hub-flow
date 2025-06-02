
import React, { useState, useEffect } from 'react';
import { getProducts } from '@/services/adminProductService';
import { Product } from '@/types';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import ProductFilters from '@/components/product/ProductFilters';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const productsList = await getProducts();
        setProducts(productsList);
        setFilteredProducts(productsList);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to empty array
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (filters: any) => {
    let filtered = [...products];

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter(product => product.price >= min && product.price <= max);
    }

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <ProductFilters 
              products={products}
              onFilterChange={handleFilterChange}
            />
          </div>
          
          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">All Products</h1>
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <p>Loading products...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gray-500">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
