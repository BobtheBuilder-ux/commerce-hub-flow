
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingCart, Heart, MapPin, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { userData } = useAuth();

  return (
    <DashboardLayout title="Account Overview">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="pb-6 border-b">
          <h2 className="text-xl font-semibold mb-2">Welcome back, {userData?.displayName}!</h2>
          <p className="text-gray-600">
            Manage your orders, shipping addresses, payment methods, and account settings here.
          </p>
        </div>
        
        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                <span>My Orders</span>
              </CardTitle>
              <CardDescription>View and track your orders</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Check the status of recent orders and view order history.</p>
              <Link to="/dashboard/orders">
                <Button className="bg-brand-purple hover:bg-brand-purple-dark">View Orders</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="mr-2 h-5 w-5" />
                <span>Wishlist</span>
              </CardTitle>
              <CardDescription>Products you've saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Browse products you've added to your wishlist.</p>
              <Link to="/dashboard/wishlist">
                <Button className="bg-brand-purple hover:bg-brand-purple-dark">View Wishlist</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                <span>Shipping Addresses</span>
              </CardTitle>
              <CardDescription>Manage your delivery locations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Add, edit, or remove your shipping addresses.</p>
              <Link to="/dashboard/addresses">
                <Button className="bg-brand-purple hover:bg-brand-purple-dark">Manage Addresses</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                <span>Payment Methods</span>
              </CardTitle>
              <CardDescription>Manage your payment options</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Add, edit, or remove payment methods.</p>
              <Link to="/dashboard/payment-methods">
                <Button className="bg-brand-purple hover:bg-brand-purple-dark">Manage Payments</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Activity/Orders */}
        <div className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-gray-500">No recent orders found.</p>
            <Link to="/products">
              <Button variant="link" className="text-brand-purple mt-2">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
