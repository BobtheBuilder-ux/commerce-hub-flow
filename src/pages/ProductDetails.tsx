
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink 
} from '@/components/ui/breadcrumb';
import { 
  Card,
  CardContent
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Minus, Plus, ShoppingCart } from 'lucide-react';

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      setIsLoading(true);
      try {
        const productDoc = await getDoc(doc(db, 'products', productId));
        
        if (productDoc.exists()) {
          setProduct({ 
            id: productDoc.id, 
            ...productDoc.data() 
          } as Product);
        } else {
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        // Use sample data as fallback
        setProduct(sampleProducts.find(p => p.id === productId) || sampleProducts[0]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setQuantity(1);
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.inventory) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
          <p>Loading product information...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-500 mb-6">The product you're looking for doesn't exist.</p>
            <Link to="/products">
              <Button>Browse All Products</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Breadcrumb className="mb-6">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>{product.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border">
              <img 
                src={product.images?.[selectedImage] || '/placeholder.svg'} 
                alt={product.name} 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex space-x-2">
              {product.images?.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 border-2 rounded overflow-hidden ${selectedImage === index ? 'border-brand-purple' : 'border-gray-200'}`}
                >
                  <img 
                    src={image || '/placeholder.svg'} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-5 w-5 ${
                        index < Math.floor(product.averageRating || 0)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.averageRating?.toFixed(1)} ({product.reviews?.length || 0} reviews)
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                {product.inventory > 0 ? (
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    In Stock ({product.inventory} available)
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                    Out of Stock
                  </Badge>
                )}
                <Badge variant="outline">{product.category}</Badge>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-bold">
                ${product.salePrice ? (
                  <>
                    <span>{product.salePrice}</span>
                    <span className="text-lg text-gray-400 line-through ml-2">${product.price}</span>
                  </>
                ) : (
                  product.price
                )}
              </p>
              {product.salePrice && (
                <div className="text-sm font-medium text-green-600">
                  Save ${(product.price - (product.salePrice || 0)).toFixed(2)} ({Math.round((1 - (product.salePrice || 0) / product.price) * 100)}%)
                </div>
              )}
            </div>
            
            <p className="text-gray-600">{product.description}</p>
            
            {product.inventory > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span>Quantity:</span>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={decrementQuantity}
                      disabled={quantity === 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-4 w-8 text-center">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={incrementQuantity}
                      disabled={quantity >= product.inventory}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Additional Product Information */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Product Details</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="prose max-w-none">
                <p>{product.description}</p>
                {/* Add more detailed content here when available */}
              </div>
            </CardContent>
          </Card>
        </div>
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
    description: 'High-quality wireless headphones with noise cancellation. Perfect for immersive music experience with advanced noise cancellation technology. Features include Bluetooth 5.0, 30-hour battery life, and comfortable ear cushions for extended wear.',
    price: 89.99,
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    category: 'Electronics',
    inventory: 23,
    featured: true,
    averageRating: 4.5,
    reviews: [],
    createdAt: Date.now() - 1000000,
    updatedAt: Date.now() - 500000
  }
];

export default ProductDetails;
