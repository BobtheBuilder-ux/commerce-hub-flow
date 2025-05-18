
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJmL0bxw2B5M349P-8KpphcBFMcdtT2ss",
  authDomain: "shop-project-7d0b0.firebaseapp.com",
  projectId: "shop-project-7d0b0",
  storageBucket: "shop-project-7d0b0.firebasestorage.app",
  messagingSenderId: "875043531801",
  appId: "1:875043531801:web:0497b242ad109c3b2dce88",
  measurementId: "G-1YV86QQMQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics if supported
export const initAnalytics = async () => {
  if (await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

export default app;
