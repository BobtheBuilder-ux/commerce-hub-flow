
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink 
} from '@/components/ui/breadcrumb';
import { ChevronRight } from 'lucide-react';

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<{ id: string; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!categoryId) return;

      setIsLoading(true);
      try {
        // Fetch category details
        const categoryRef = doc(db, 'categories', categoryId);
        const categorySnap = await getDoc(categoryRef);
        
        if (categorySnap.exists()) {
          setCategory({ 
            id: categorySnap.id, 
            name: categorySnap.data().name 
          });
        }

        // Fetch products in this category
        const productsQuery = query(
          collection(db, 'products'), 
          where('category', '==', categoryId)
        );
        const productsSnapshot = await getDocs(productsQuery);
        
        const productsList: Product[] = [];
        productsSnapshot.forEach(doc => {
          productsList.push({ id: doc.id, ...doc.data() } as Product);
        });
        setProducts(productsList);
      } catch (error) {
        console.error('Error fetching category data:', error);
        // Use sample data for demonstration if error
        setCategory({ id: categoryId || 'unknown', name: categoryId || 'Unknown Category' });
        setProducts(sampleProducts.filter(p => p.category.toLowerCase() === categoryId?.toLowerCase()));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Breadcrumb className="mb-6">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>{category?.name || 'Loading...'}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        <h1 className="text-3xl font-bold mb-6">{category?.name || 'Loading...'}</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <p>Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No products found in this category.</p>
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

export default Category;
