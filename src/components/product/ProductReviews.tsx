
import React, { useState, useEffect } from 'react';
import { Product, ProductReview } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, User, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { checkUserPurchasedProduct, addProductReview } from '@/services/reviewService';

interface ProductReviewsProps {
  product: Product;
  onReviewAdded: (review: ProductReview) => void;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ product, onReviewAdded }) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canReview, setCanReview] = useState(false);
  const [checkingPurchase, setCheckingPurchase] = useState(false);

  useEffect(() => {
    const checkPurchaseStatus = async () => {
      if (!currentUser) return;
      
      setCheckingPurchase(true);
      try {
        const hasPurchased = await checkUserPurchasedProduct(currentUser.uid, product.id);
        setCanReview(hasPurchased);
      } catch (error) {
        console.error('Error checking purchase status:', error);
      } finally {
        setCheckingPurchase(false);
      }
    };

    checkPurchaseStatus();
  }, [currentUser, product.id]);

  const handleSubmitReview = async () => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to leave a review",
        variant: "destructive"
      });
      return;
    }

    if (!canReview) {
      toast({
        title: "Purchase Required",
        description: "You can only review products you have purchased",
        variant: "destructive"
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const newReview: Omit<ProductReview, 'id'> = {
        productId: product.id,
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        rating,
        comment,
        verified: true,
        createdAt: Date.now()
      };

      const addedReview = await addProductReview(newReview);
      onReviewAdded(addedReview);
      setRating(0);
      setComment('');
      toast({
        title: "Success",
        description: "Review submitted successfully!"
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Review Form */}
      {currentUser && (
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
            {checkingPurchase ? (
              <p className="text-sm text-gray-500">Checking purchase history...</p>
            ) : canReview ? (
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">Verified Purchase</span>
              </div>
            ) : (
              <p className="text-sm text-amber-600">You can only review products you have purchased</p>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => canReview && setRating(star)}
                    disabled={!canReview}
                    className="focus:outline-none disabled:cursor-not-allowed"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      } ${!canReview ? 'opacity-50' : ''}`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Comment</label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this product..."
                rows={4}
                disabled={!canReview}
              />
            </div>
            <Button 
              onClick={handleSubmitReview}
              disabled={isSubmitting || rating === 0 || !canReview}
              className="bg-brand-gold hover:bg-brand-gold-dark text-brand-chocolate"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews ({product.reviews?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="h-5 w-5 text-gray-400" />
                    <span className="font-medium">{review.userName}</span>
                    {review.verified && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        Verified Purchase
                      </Badge>
                    )}
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductReviews;
