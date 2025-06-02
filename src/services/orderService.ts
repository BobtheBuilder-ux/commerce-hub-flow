
import { 
  collection, 
  addDoc, 
  getDocs, 
  query,
  where,
  orderBy,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Order, CartItem } from '@/types';

export const createOrder = async (orderData: {
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: any;
}) => {
  try {
    const order: Omit<Order, 'id'> = {
      ...orderData,
      status: 'pending',
      paymentId: '',
      paymentStatus: 'pending',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const docRef = await addDoc(collection(db, 'orders'), order);
    return { id: docRef.id, ...order };
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const orders: Order[] = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() } as Order);
    });
    
    return orders;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
};

export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const orders: Order[] = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() } as Order);
    });
    
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

export const updateOrderStatus = async (orderId: string, status: Order['status']) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      status,
      updatedAt: Date.now()
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};
