
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product, ProductReview } from '@/types';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductReviews from '@/components/product/ProductReviews';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Minus, Plus, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariation, setSelectedVariation] = useState<string>('');
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
          // Use sample data as fallback
          setProduct(sampleProducts.find(p => p.id === productId) || sampleProducts[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
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

  const handleReviewAdded = (review: ProductReview) => {
    if (product) {
      setProduct({
        ...product,
        reviews: [...(product.reviews || []), review]
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
          <div className="animate-pulse text-lg">Loading product information...</div>
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Breadcrumb className="mb-8">
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images & Videos */}
          <div className="space-y-6">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-lg">
              <img 
                src={product.images?.[selectedImage] || '/placeholder.svg'} 
                alt={product.name} 
                className="object-cover w-full h-full"
              />
              {product.salePrice && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Sale
                </div>
              )}
            </div>
            
            {/* Image & Video Thumbnails */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images?.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img 
                    src={image || '/placeholder.svg'} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
              {product.videos?.map((video, index) => (
                <div 
                  key={`video-${index}`}
                  className="flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden border-gray-200 bg-gray-100 flex items-center justify-center"
                >
                  <span className="text-xs text-gray-500">Video</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Information */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4 text-gray-900">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
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
                  <span className="text-sm text-gray-600">
                    {product.averageRating?.toFixed(1)} ({product.reviews?.length || 0} reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.salePrice || product.price}
                  </span>
                  {product.salePrice && (
                    <span className="text-xl text-gray-400 line-through">
                      ${product.price}
                    </span>
                  )}
                </div>
                {product.salePrice && (
                  <div className="text-sm font-medium text-green-600">
                    Save ${(product.price - (product.salePrice || 0)).toFixed(2)} 
                    ({Math.round((1 - (product.salePrice || 0) / product.price) * 100)}% off)
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3 mb-8">
                {product.inventory > 0 ? (
                  <Badge className="bg-green-100 text-green-800 border-green-200 px-3 py-1">
                    ✓ In Stock ({product.inventory} available)
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="px-3 py-1">
                    Out of Stock
                  </Badge>
                )}
                <Badge variant="outline" className="px-3 py-1">{product.category}</Badge>
                {product.featured && (
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200 px-3 py-1">
                    Featured
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Variations */}
            {product.variations && product.variations.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Options</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.variations.map((variation) => (
                    <button
                      key={variation.id}
                      onClick={() => setSelectedVariation(variation.id)}
                      className={`p-3 border rounded-lg text-left ${
                        selectedVariation === variation.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium">{variation.name}: {variation.value}</div>
                      {variation.price && variation.price > 0 && (
                        <div className="text-sm text-gray-600">+${variation.price}</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {product.inventory > 0 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">Quantity:</span>
                    <div className="flex items-center border rounded-lg">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={decrementQuantity}
                        disabled={quantity === 1}
                        className="h-10 w-10"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-4 w-8 text-center font-medium">{quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={incrementQuantity}
                        disabled={quantity >= product.inventory}
                        className="h-10 w-10"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button 
                    size="lg" 
                    className="flex-1 h-12 text-lg font-semibold"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="h-12"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="h-12"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Product Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t">
              <div className="flex items-center space-x-3">
                <Truck className="h-6 w-6 text-blue-600" />
                <div>
                  <div className="font-medium">Free Shipping</div>
                  <div className="text-sm text-gray-600">On orders over $50</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-green-600" />
                <div>
                  <div className="font-medium">Secure Payment</div>
                  <div className="text-sm text-gray-600">100% protected</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-6 w-6 text-purple-600" />
                <div>
                  <div className="font-medium">Easy Returns</div>
                  <div className="text-sm text-gray-600">30-day policy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews?.length || 0})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <ProductReviews product={product} onReviewAdded={handleReviewAdded} />
            </TabsContent>
          </Tabs>
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
    name: 'Premium Wireless Headphones',
    description: 'Experience superior sound quality with our premium wireless headphones. Featuring advanced noise cancellation technology, these headphones deliver crystal-clear audio for an immersive listening experience. Perfect for music lovers, professionals, and anyone who values high-quality sound.',
    price: 89.99,
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    category: 'Electronics',
    inventory: 23,
    featured: true,
    averageRating: 4.5,
    reviews: [],
    variations: [
      { id: 'color-black', name: 'Color', value: 'Black', price: 0 },
      { id: 'color-white', name: 'Color', value: 'White', price: 5 },
      { id: 'color-blue', name: 'Color', value: 'Blue', price: 10 }
    ],
    createdAt: Date.now() - 1000000,
    updatedAt: Date.now() - 500000
  }
];

export default ProductDetails;
