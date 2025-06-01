
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { doc, setDoc, getDoc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CartItem, Product } from '../types';
import { useAuth } from './AuthContext';
import { toast } from '@/components/ui/sonner';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

const CART_STORAGE_KEY = 'ecommerce_cart';

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Calculate derived values
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  // Load cart data on initial load or when user changes
  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        if (currentUser) {
          // Fetch cart from Firestore for logged in users
          try {
            const cartDoc = await getDoc(doc(db, 'carts', currentUser.uid));
            if (cartDoc.exists()) {
              const cartData = cartDoc.data();
              const cartItems: CartItem[] = cartData.items || [];
              setItems(cartItems);
            } else {
              // New user, no cart yet
              setItems([]);
            }
          } catch (firestoreError) {
            console.warn("Firestore unavailable, using localStorage:", firestoreError);
            // Fallback to localStorage if Firestore is unavailable
            const storedCart = localStorage.getItem(CART_STORAGE_KEY);
            if (storedCart) {
              setItems(JSON.parse(storedCart));
            } else {
              setItems([]);
            }
          }
        } else {
          // Use localStorage for guest users
          const storedCart = localStorage.getItem(CART_STORAGE_KEY);
          if (storedCart) {
            try {
              setItems(JSON.parse(storedCart));
            } catch (parseError) {
              console.warn("Invalid cart data in localStorage, clearing:", parseError);
              localStorage.removeItem(CART_STORAGE_KEY);
              setItems([]);
            }
          } else {
            setItems([]);
          }
        }
      } catch (error) {
        console.error("Error loading cart:", error);
        // Fallback to empty cart instead of showing error toast
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [currentUser]);

  // Save cart when it changes
  useEffect(() => {
    const saveCart = async () => {
      if (loading) return;

      try {
        if (currentUser) {
          // Save to Firestore for logged in users
          try {
            await setDoc(doc(db, 'carts', currentUser.uid), {
              items,
              updatedAt: new Date(),
            }, { merge: true });
          } catch (firestoreError) {
            console.warn("Firestore unavailable, using localStorage:", firestoreError);
            // Fallback to localStorage if Firestore is unavailable
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
          }
        } else {
          // Save to localStorage for guest users
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        }
      } catch (error) {
        console.error("Error saving cart:", error);
        // Still try to save to localStorage as fallback
        try {
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        } catch (localStorageError) {
          console.error("Failed to save to localStorage:", localStorageError);
        }
      }
    };

    saveCart();
  }, [items, currentUser, loading]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.productId === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if product is already in cart
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Add new item to cart
        return [...prevItems, {
          productId: product.id,
          product,
          quantity,
          price: product.salePrice || product.price
        }];
      }
    });
    
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.productId !== productId));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.success("Cart cleared");
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      itemCount,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
};
