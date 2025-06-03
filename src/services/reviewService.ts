
import { 
  collection, 
  query, 
  where, 
  getDocs,
  addDoc,
  doc,
  updateDoc,
  arrayUnion
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ProductReview } from '@/types';

export const checkUserPurchasedProduct = async (userId: string, productId: string): Promise<boolean> => {
  try {
    const ordersQuery = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      where('status', 'in', ['delivered', 'completed'])
    );
    
    const ordersSnapshot = await getDocs(ordersQuery);
    
    for (const orderDoc of ordersSnapshot.docs) {
      const orderData = orderDoc.data();
      const hasPurchasedProduct = orderData.items?.some((item: any) => item.productId === productId);
      if (hasPurchasedProduct) {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error checking user purchase:', error);
    return false;
  }
};

export const addProductReview = async (review: Omit<ProductReview, 'id'>): Promise<ProductReview> => {
  try {
    // Add review to reviews collection
    const reviewDocRef = await addDoc(collection(db, 'reviews'), {
      ...review,
      createdAt: Date.now()
    });
    
    // Update product with the new review
    const productRef = doc(db, 'products', review.productId);
    await updateDoc(productRef, {
      reviews: arrayUnion({
        ...review,
        id: reviewDocRef.id,
        createdAt: Date.now()
      })
    });
    
    return {
      ...review,
      id: reviewDocRef.id,
      createdAt: Date.now()
    };
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};
