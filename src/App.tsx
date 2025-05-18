
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/dashboard/Orders";
import Wishlist from "./pages/dashboard/Wishlist";
import Addresses from "./pages/dashboard/Addresses";
import PaymentMethods from "./pages/dashboard/PaymentMethods";
import AccountSettings from "./pages/dashboard/AccountSettings";
import AdminDashboard from "./pages/AdminDashboard";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

// Auth required route component
import { useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const { userData, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!userData || userData.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/register" element={<AdminRegister />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<ProductDetails />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:categoryId" element={<Category />} />
              <Route path="/cart" element={<Cart />} />
              
              {/* Protected customer routes */}
              <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
              <Route path="/dashboard/orders" element={<RequireAuth><Orders /></RequireAuth>} />
              <Route path="/dashboard/wishlist" element={<RequireAuth><Wishlist /></RequireAuth>} />
              <Route path="/dashboard/addresses" element={<RequireAuth><Addresses /></RequireAuth>} />
              <Route path="/dashboard/payment-methods" element={<RequireAuth><PaymentMethods /></RequireAuth>} />
              <Route path="/dashboard/settings" element={<RequireAuth><AccountSettings /></RequireAuth>} />
              
              {/* Protected admin routes */}
              <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
              <Route path="/admin/*" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
