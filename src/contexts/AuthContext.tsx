import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  getAuth,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { User } from '../types';
import { toast } from '@/components/ui/sonner';

// Admin emails list - in a real app, this would be stored securely in the backend
const ADMIN_EMAILS = [
  'admin@shophub.com',
  'manager@shophub.com',
  'support@shophub.com'
];

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userData: User | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string, isAdmin?: boolean) => Promise<void>;
  signIn: (email: string, password: string) => Promise<FirebaseUser | null>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  sendPasswordlessSignIn: (email: string) => Promise<void>;
  completePasswordlessSignIn: (email: string, linkUrl: string) => Promise<void>;
  isAdmin: (email?: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// For passwordless auth
const actionCodeSettings = {
  url: window.location.origin + '/login',
  handleCodeInApp: true,
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const existingUserData = userDoc.data() as User;
            
            // Check if user should be admin and update role if necessary
            if (user.email && ADMIN_EMAILS.includes(user.email.toLowerCase()) && existingUserData.role !== 'admin') {
              const updatedUserData = { ...existingUserData, role: 'admin' as const };
              await setDoc(userDocRef, updatedUserData);
              setUserData(updatedUserData);
            } else {
              setUserData(existingUserData);
            }
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const isAdmin = (email?: string): boolean => {
    const emailToCheck = email || currentUser?.email || userData?.email;
    return emailToCheck ? ADMIN_EMAILS.includes(emailToCheck.toLowerCase()) : false;
  };

  const signUp = async (email: string, password: string, displayName: string, isAdminRegistration = false) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update the user's display name
      await updateProfile(user, { displayName });
      
      // Determine role based on email and registration type
      const role = (isAdminRegistration && isAdmin(email)) ? 'admin' : 'customer';
      
      // Store additional user data in Firestore
      const userData: User = {
        uid: user.uid,
        email: user.email || '',
        displayName,
        role,
        createdAt: Date.now(),
      };
      
      await setDoc(doc(db, 'users', user.uid), userData);
      setUserData(userData);
      
      toast.success("Account created successfully!");
      
      // Navigate based on role
      if (role === 'admin') {
        // For admin users, we'll handle navigation in the component
        setTimeout(() => {
          window.location.href = '/admin';
        }, 1000);
      }
    } catch (error: any) {
      console.error('Error signing up:', error);
      toast.error(error.message || "Failed to create account");
      throw error;
    }
  };

  const signIn = async (email: string, password: string): Promise<FirebaseUser | null> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update user role if they're an admin
      if (isAdmin(email)) {
        await setDoc(doc(db, 'users', user.uid), {
          role: 'admin'
        }, { merge: true });
      }
      
      toast.success("Signed in successfully!");
      return user;
    } catch (error: any) {
      console.error('Error signing in:', error);
      toast.error(error.message || "Failed to sign in");
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success("Signed out successfully!");
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast.error(error.message || "Failed to sign out");
      throw error;
    }
  };

  // Google Sign-In Method
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Determine role based on email
      const role = isAdmin(user.email) ? 'admin' : 'customer';
      
      // Check if user already exists in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        // Create new user document
        const userData: User = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'Google User',
          role,
          createdAt: Date.now(),
        };
        
        await setDoc(userDocRef, userData);
      } else {
        // Update existing user role if they're an admin
        if (role === 'admin') {
          await setDoc(userDocRef, { role }, { merge: true });
        }
      }
      
      toast.success("Signed in with Google successfully!");
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      toast.error(error.message || "Failed to sign in with Google");
      throw error;
    }
  };

  // Passwordless Sign-In (Magic Link)
  const sendPasswordlessSignIn = async (email: string) => {
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      
      // Store email in localStorage to use when completing sign in
      window.localStorage.setItem('emailForSignIn', email);
      
      toast.success(`Sign-in link sent to ${email}. Please check your email.`);
    } catch (error: any) {
      console.error('Error sending passwordless sign-in link:', error);
      toast.error(error.message || "Failed to send sign-in link");
      throw error;
    }
  };

  // Complete the passwordless sign-in process
  const completePasswordlessSignIn = async (email: string, linkUrl: string) => {
    try {
      if (isSignInWithEmailLink(auth, linkUrl)) {
        const result = await signInWithEmailLink(auth, email, linkUrl);
        const user = result.user;
        
        // Remove email from storage
        window.localStorage.removeItem('emailForSignIn');
        
        // Determine role based on email
        const role = isAdmin(email) ? 'admin' : 'customer';
        
        // Check if user already exists in Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (!userDoc.exists()) {
          // Create new user document
          const userData: User = {
            uid: user.uid,
            email: user.email || '',
            displayName: email.split('@')[0], // Simple display name from email
            role,
            createdAt: Date.now(),
          };
          
          await setDoc(userDocRef, userData);
        } else if (role === 'admin') {
          // Update existing user role if they're an admin
          await setDoc(userDocRef, { role }, { merge: true });
        }
        
        toast.success("Signed in successfully!");
      }
    } catch (error: any) {
      console.error('Error completing passwordless sign-in:', error);
      toast.error(error.message || "Failed to complete sign-in");
      throw error;
    }
  };

  const value = {
    currentUser,
    userData,
    loading,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
    sendPasswordlessSignIn,
    completePasswordlessSignIn,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
