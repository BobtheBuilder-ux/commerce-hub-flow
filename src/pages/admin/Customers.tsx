
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Eye, Edit } from 'lucide-react';

const AdminCustomers = () => {
  const mockCustomers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      orders: 5,
      totalSpent: 450.99,
      status: 'Active',
      joinDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      orders: 12,
      totalSpent: 1299.99,
      status: 'VIP',
      joinDate: '2023-11-20'
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      orders: 2,
      totalSpent: 89.99,
      status: 'Active',
      joinDate: '2024-02-10'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VIP':
        return 'bg-purple-100 text-purple-800';
      case 'Active':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout title="Customers">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-brand-chocolate">Customers</h1>
          <p className="text-brand-chocolate-light">Manage your customers</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-chocolate">234</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">New This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">28</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">VIP Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">15</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">47</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search customers..."
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell>${customer.totalSpent}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(customer.status)}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{customer.joinDate}</TableCell>
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

export default AdminCustomers;
