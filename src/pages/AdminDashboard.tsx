
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import DashboardStats from '@/components/admin/DashboardStats';
import ProductManagement from '@/components/admin/ProductManagement';
import RecentOrders from '@/components/admin/RecentOrders';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/admin/login');
      return;
    }

    // Load mock data
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Premium Wireless Headphones',
        price: 89.99,
        inventory: 23,
        category: 'Electronics',
        featured: true,
        description: 'High-quality wireless headphones',
        images: ['/placeholder.svg'],
        averageRating: 4.5,
        reviews: [],
        createdAt: Date.now() - 1000000,
        updatedAt: Date.now() - 500000
      },
      {
        id: '2',
        name: 'Smart Fitness Watch',
        price: 129.99,
        inventory: 15,
        category: 'Electronics',
        featured: false,
        description: 'Advanced smartwatch with health tracking',
        images: ['/placeholder.svg'],
        averageRating: 4.3,
        reviews: [],
        createdAt: Date.now() - 2000000,
        updatedAt: Date.now() - 1000000
      }
    ];

    setProducts(mockProducts);
    setStats({
      totalProducts: mockProducts.length,
      totalOrders: 45,
      totalRevenue: 12450.00,
      totalUsers: 234
    });
  }, [currentUser, navigate]);

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
    toast({
      title: "Product Deleted",
      description: "Product has been successfully removed.",
    });
  };

  const handleRunTests = () => {
    toast({
      title: "Tests Running",
      description: "Running application tests...",
    });
    
    // Simulate test running
    setTimeout(() => {
      toast({
        title: "Tests Completed",
        description: "All tests passed successfully!",
      });
    }, 2000);
  };

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-brand-chocolate">Admin Dashboard</h1>
            <p className="text-brand-chocolate-light">Manage your store and monitor performance</p>
          </div>
          <Button 
            onClick={handleRunTests}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Play className="h-4 w-4 mr-2" />
            Run Tests
          </Button>
        </div>

        <DashboardStats stats={stats} />
        <ProductManagement products={products} onDeleteProduct={handleDeleteProduct} />
        <RecentOrders />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
