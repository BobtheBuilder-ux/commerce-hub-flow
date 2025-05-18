
import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ArrowLeft,
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart, 
  Settings,
  CreditCard
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const { userData } = useAuth();
  
  // Redirect if not admin
  if (userData && userData.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }
  
  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: 'Products',
      href: '/admin/products',
      icon: <Package className="h-5 w-5" />,
    },
    {
      name: 'Orders',
      href: '/admin/orders',
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      name: 'Customers',
      href: '/admin/customers',
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      name: 'Payments',
      href: '/admin/payments',
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 bg-gray-900">
            <div className="flex items-center h-16 px-4 bg-gray-800">
              <Link to="/" className="text-xl font-bold text-white">
                ShopHub Admin
              </Link>
            </div>
            <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "group flex items-center px-3 py-3 text-sm font-medium rounded-md",
                      location.pathname === item.href
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    )}
                  >
                    <div className="mr-3">{item.icon}</div>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="p-4 border-t border-gray-700">
              <Link to="/">
                <Button variant="outline" size="sm" className="w-full text-white border-gray-600 hover:bg-gray-700">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shop
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col flex-1 w-0 overflow-hidden">
          {/* Mobile Header */}
          <div className="md:hidden bg-white shadow-sm py-2 px-4 flex items-center justify-between">
            <h1 className="text-lg font-medium">{title}</h1>
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none">
                <span className="sr-only">Open sidebar</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Page Content */}
          <main className="flex-1 relative overflow-y-auto focus:outline-none p-6">
            <div className="max-w-7xl mx-auto">
              <div className="pb-5 border-b border-gray-200 mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              </div>
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
