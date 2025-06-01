
import { databases } from '@/lib/appwrite';
import { Product } from '@/types';

const DATABASE_ID = 'main';
const PRODUCTS_COLLECTION_ID = 'products';

export const productService = {
  async getProducts(): Promise<Product[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID
      );
      
      return response.documents.map(doc => ({
        id: doc.$id,
        name: doc.name,
        description: doc.description,
        price: doc.price,
        salePrice: doc.salePrice,
        images: doc.images || ['/placeholder.svg'],
        category: doc.category,
        inventory: doc.inventory,
        featured: doc.featured,
        averageRating: doc.averageRating,
        reviews: doc.reviews || [],
        createdAt: new Date(doc.$createdAt).getTime(),
        updatedAt: new Date(doc.$updatedAt).getTime()
      })) as Product[];
    } catch (error) {
      console.error('Error fetching products from Appwrite:', error);
      // Return fallback data
      return sampleProducts;
    }
  },

  async getProduct(id: string): Promise<Product | null> {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        id
      );
      
      return {
        id: response.$id,
        name: response.name,
        description: response.description,
        price: response.price,
        salePrice: response.salePrice,
        images: response.images || ['/placeholder.svg'],
        category: response.category,
        inventory: response.inventory,
        featured: response.featured,
        averageRating: response.averageRating,
        reviews: response.reviews || [],
        createdAt: new Date(response.$createdAt).getTime(),
        updatedAt: new Date(response.$updatedAt).getTime()
      } as Product;
    } catch (error) {
      console.error('Error fetching product from Appwrite:', error);
      return null;
    }
  }
};

// Fallback sample data
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
  }
];
