
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Product } from '@/types';

export const addProduct = async (
  productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>, 
  imageFiles: File[] = [], 
  videoFiles: File[] = []
) => {
  try {
    let imageUrls: string[] = [];
    let videoUrls: string[] = [];
    
    // Upload images
    if (imageFiles.length > 0) {
      for (const file of imageFiles) {
        const imageRef = ref(storage, `products/images/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(imageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        imageUrls.push(url);
      }
    } else {
      imageUrls = ['/placeholder.svg'];
    }

    // Upload videos
    if (videoFiles.length > 0) {
      for (const file of videoFiles) {
        const videoRef = ref(storage, `products/videos/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(videoRef, file);
        const url = await getDownloadURL(snapshot.ref);
        videoUrls.push(url);
      }
    }

    const product = {
      ...productData,
      images: imageUrls,
      videos: videoUrls,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      reviews: []
    };

    const docRef = await addDoc(collection(db, 'products'), product);
    return { id: docRef.id, ...product };
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });
    
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const updateProduct = async (id: string, updates: Partial<Product>) => {
  try {
    const productRef = doc(db, 'products', id);
    await updateDoc(productRef, {
      ...updates,
      updatedAt: Date.now()
    });
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'products', id));
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
