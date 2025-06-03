
import { Product } from '@/types';

interface DummyJSONProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface DummyJSONResponse {
  products: DummyJSONProduct[];
  total: number;
  skip: number;
  limit: number;
}

const mapDummyJSONToProduct = (dummyProduct: DummyJSONProduct): Product => {
  const salePrice = dummyProduct.discountPercentage > 0 
    ? dummyProduct.price * (1 - dummyProduct.discountPercentage / 100)
    : undefined;

  return {
    id: dummyProduct.id.toString(),
    name: dummyProduct.title,
    description: dummyProduct.description,
    price: dummyProduct.price,
    salePrice,
    images: dummyProduct.images.length > 0 ? dummyProduct.images : [dummyProduct.thumbnail],
    category: dummyProduct.category,
    subcategory: dummyProduct.brand,
    inventory: dummyProduct.stock,
    featured: dummyProduct.rating > 4.5,
    averageRating: dummyProduct.rating,
    reviews: [],
    createdAt: Date.now() - Math.random() * 10000000,
    updatedAt: Date.now() - Math.random() * 5000000
  };
};

export const fetchDummyJSONProducts = async (limit: number = 100): Promise<Product[]> => {
  try {
    const response = await fetch(`https://dummyjson.com/products?limit=${limit}`);
    const data: DummyJSONResponse = await response.json();
    
    return data.products.map(mapDummyJSONToProduct);
  } catch (error) {
    console.error('Error fetching products from DummyJSON:', error);
    return [];
  }
};

export const fetchDummyJSONProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await fetch(`https://dummyjson.com/products/category/${category}`);
    const data: DummyJSONResponse = await response.json();
    
    return data.products.map(mapDummyJSONToProduct);
  } catch (error) {
    console.error('Error fetching products by category from DummyJSON:', error);
    return [];
  }
};

export const fetchDummyJSONCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch('https://dummyjson.com/products/categories');
    const categories: string[] = await response.json();
    
    return categories;
  } catch (error) {
    console.error('Error fetching categories from DummyJSON:', error);
    return [];
  }
};
