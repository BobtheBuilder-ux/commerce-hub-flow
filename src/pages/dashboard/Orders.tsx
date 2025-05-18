
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Orders = () => {
  const { userData } = useAuth();

  // This would typically be fetched from a database
  const orders = [];

  return (
    <DashboardLayout title="My Orders">
      <div className="space-y-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="pt-4">
            {orders.length > 0 ? (
              <div className="space-y-4">
                {/* Order items would go here */}
              </div>
            ) : (
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
                <p className="mt-1 text-gray-500">You haven't placed any orders yet.</p>
                <Link to="/products">
                  <Button className="mt-4 bg-brand-purple hover:bg-brand-purple-dark">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pending" className="pt-4">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <Clock className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No pending orders</h3>
              <p className="mt-1 text-gray-500">You don't have any pending orders at the moment.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="shipped" className="pt-4">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No shipped orders</h3>
              <p className="mt-1 text-gray-500">You don't have any orders currently being shipped.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="delivered" className="pt-4">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No delivered orders</h3>
              <p className="mt-1 text-gray-500">You don't have any delivered orders yet.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
