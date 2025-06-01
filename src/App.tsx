
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from '@/components/ui/sonner';

// Lazy load components for code splitting
const Index = lazy(() => import('@/pages/Index'));
const Products = lazy(() => import('@/pages/Products'));
const ProductDetails = lazy(() => import('@/pages/ProductDetails'));
const Cart = lazy(() => import('@/pages/Cart'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const ThankYou = lazy(() => import('@/pages/ThankYou'));
const Categories = lazy(() => import('@/pages/Categories'));
const Category = lazy(() => import('@/pages/Category'));
const NewArrivals = lazy(() => import('@/pages/NewArrivals'));
const FeaturedProducts = lazy(() => import('@/pages/FeaturedProducts'));
const Sale = lazy(() => import('@/pages/Sale'));
const ContactUs = lazy(() => import('@/pages/ContactUs'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const ShippingReturns = lazy(() => import('@/pages/ShippingReturns'));
const TermsConditions = lazy(() => import('@/pages/TermsConditions'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const AdminLogin = lazy(() => import('@/pages/AdminLogin'));
const AdminRegister = lazy(() => import('@/pages/AdminRegister'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Orders = lazy(() => import('@/pages/dashboard/Orders'));
const Wishlist = lazy(() => import('@/pages/dashboard/Wishlist'));
const Addresses = lazy(() => import('@/pages/dashboard/Addresses'));
const PaymentMethods = lazy(() => import('@/pages/dashboard/PaymentMethods'));
const AccountSettings = lazy(() => import('@/pages/dashboard/AccountSettings'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Loading component
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-brand-beige">
            <Suspense fallback={<Loading />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:productId" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/:categoryId" element={<Category />} />
                <Route path="/new-arrivals" element={<NewArrivals />} />
                <Route path="/featured" element={<FeaturedProducts />} />
                <Route path="/sale" element={<Sale />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/shipping-returns" element={<ShippingReturns />} />
                <Route path="/terms" element={<TermsConditions />} />
                
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                
                {/* Customer Dashboard Routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/orders" element={<Orders />} />
                <Route path="/dashboard/wishlist" element={<Wishlist />} />
                <Route path="/dashboard/addresses" element={<Addresses />} />
                <Route path="/dashboard/payment-methods" element={<PaymentMethods />} />
                <Route path="/dashboard/account-settings" element={<AccountSettings />} />
                
                {/* Catch all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Toaster />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
