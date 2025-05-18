
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import { 
  ArrowLeft, 
  User, 
  ShoppingCart, 
  Heart, 
  MapPin, 
  CreditCard,
  Settings 
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const { userData } = useAuth();
  
  const navigation = [
    {
      name: 'Account Overview',
      href: '/dashboard',
      icon: <User className="h-5 w-5" />,
    },
    {
      name: 'My Orders',
      href: '/dashboard/orders',
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      name: 'Wishlist',
      href: '/dashboard/wishlist',
      icon: <Heart className="h-5 w-5" />,
    },
    {
      name: 'Addresses',
      href: '/dashboard/addresses',
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      name: 'Payment Methods',
      href: '/dashboard/payment-methods',
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: 'Account Settings',
      href: '/dashboard/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4 lg:w-1/5">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-brand-purple text-white p-3 rounded-full">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">{userData?.displayName}</p>
                  <p className="text-sm text-gray-500">{userData?.email}</p>
                </div>
              </div>
              <Link to="/">
                <Button variant="outline" size="sm" className="mb-6 w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shop
                </Button>
              </Link>
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                      location.pathname === item.href
                        ? "bg-brand-purple-light text-brand-purple"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    <div className="mr-3">{item.icon}</div>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4 lg:w-4/5">
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold mb-6 pb-4 border-b">{title}</h1>
              {children}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DashboardLayout;
