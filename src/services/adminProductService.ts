
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

export const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>, imageFile?: File) => {
  try {
    let imageUrl = '/placeholder.svg';
    
    // Upload image if provided
    if (imageFile) {
      const imageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const product = {
      ...productData,
      images: [imageUrl],
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
