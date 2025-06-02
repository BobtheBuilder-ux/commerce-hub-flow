
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from 'lucide-react';

const AdminAnalytics = () => {
  const salesData = [
    { name: 'Jan', sales: 4000, orders: 240 },
    { name: 'Feb', sales: 3000, orders: 139 },
    { name: 'Mar', sales: 5000, orders: 980 },
    { name: 'Apr', sales: 4500, orders: 390 },
    { name: 'May', sales: 6000, orders: 480 },
    { name: 'Jun', sales: 5500, orders: 380 },
  ];

  const topProducts = [
    { name: 'Wireless Headphones', sales: 1250, trend: 'up' },
    { name: 'Smart Watch', sales: 980, trend: 'up' },
    { name: 'Laptop Stand', sales: 750, trend: 'down' },
    { name: 'USB Cable', sales: 650, trend: 'up' },
  ];

  return (
    <AdminLayout title="Analytics">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-brand-chocolate">Analytics</h1>
          <p className="text-brand-chocolate-light">Track your business performance</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-brand-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-chocolate">$45,231</div>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-brand-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-chocolate">+2,350</div>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +180.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-brand-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-chocolate">+12,234</div>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +19% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products Sold</CardTitle>
              <Package className="h-4 w-4 text-brand-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-chocolate">573</div>
              <p className="text-xs text-red-600 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#D4AF37" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="orders" stroke="#8B4513" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center text-brand-chocolate font-medium">
                      {index + 1}
                    </div>
                    <span className="font-medium">{product.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">${product.sales}</span>
                    {product.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
