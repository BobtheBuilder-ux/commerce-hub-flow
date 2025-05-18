
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Users, Package, CreditCard, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';

const AdminDashboard = () => {
  // In a real app, this would come from Firebase
  const stats = {
    totalSales: 24890,
    salesChange: 12.5,
    totalOrders: 356,
    ordersChange: 8.2,
    totalCustomers: 1245,
    customersChange: 5.7,
    totalProducts: 450,
    lowStock: 12
  };

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-2xl font-bold">${stats.totalSales.toLocaleString()}</p>
                  <div className="flex items-center space-x-1">
                    <span className={`text-xs ${stats.salesChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stats.salesChange >= 0 ? <ArrowUp className="inline h-3 w-3" /> : <ArrowDown className="inline h-3 w-3" />}
                      {Math.abs(stats.salesChange)}%
                    </span>
                    <span className="text-xs text-gray-500">vs. last month</span>
                  </div>
                </div>
                <div className="p-2 bg-brand-purple bg-opacity-10 rounded-full">
                  <CreditCard className="h-5 w-5 text-brand-purple" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                  <div className="flex items-center space-x-1">
                    <span className={`text-xs ${stats.ordersChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stats.ordersChange >= 0 ? <ArrowUp className="inline h-3 w-3" /> : <ArrowDown className="inline h-3 w-3" />}
                      {Math.abs(stats.ordersChange)}%
                    </span>
                    <span className="text-xs text-gray-500">vs. last month</span>
                  </div>
                </div>
                <div className="p-2 bg-amber-500 bg-opacity-10 rounded-full">
                  <ShoppingCart className="h-5 w-5 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{stats.totalCustomers}</p>
                  <div className="flex items-center space-x-1">
                    <span className={`text-xs ${stats.customersChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stats.customersChange >= 0 ? <ArrowUp className="inline h-3 w-3" /> : <ArrowDown className="inline h-3 w-3" />}
                      {Math.abs(stats.customersChange)}%
                    </span>
                    <span className="text-xs text-gray-500">vs. last month</span>
                  </div>
                </div>
                <div className="p-2 bg-green-500 bg-opacity-10 rounded-full">
                  <Users className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{stats.totalProducts}</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-amber-600">
                      {stats.lowStock} low stock
                    </span>
                  </div>
                </div>
                <div className="p-2 bg-blue-500 bg-opacity-10 rounded-full">
                  <Package className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity/Chart Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Chart would go here - using a placeholder */}
              <div className="h-80 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Sales chart will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Order items would be dynamically generated - using placeholders */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center border-b pb-2">
                    <div className="flex-grow">
                      <p className="font-medium">Order #{10000 + i}</p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </div>
                  </div>
                ))}
                <button className="text-sm text-brand-purple hover:text-brand-purple-dark mt-2">
                  View all orders
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
