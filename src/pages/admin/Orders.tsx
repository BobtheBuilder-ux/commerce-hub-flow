
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Edit } from 'lucide-react';

const AdminOrders = () => {
  const mockOrders = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      total: 129.99,
      status: 'Processing',
      date: new Date().toLocaleDateString(),
      items: 2
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      total: 89.99,
      status: 'Shipped',
      date: new Date(Date.now() - 86400000).toLocaleDateString(),
      items: 1
    },
    {
      id: 'ORD-003',
      customer: 'Bob Johnson',
      email: 'bob@example.com',
      total: 199.98,
      status: 'Delivered',
      date: new Date(Date.now() - 172800000).toLocaleDateString(),
      items: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-yellow-100 text-yellow-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout title="Orders">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-brand-chocolate">Orders</h1>
          <p className="text-brand-chocolate-light">Manage customer orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-chocolate">127</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">15</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">8</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">104</div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.email}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>${order.total}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
