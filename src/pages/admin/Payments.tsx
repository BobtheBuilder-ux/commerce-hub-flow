
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
import { CreditCard, DollarSign, TrendingUp, Eye, Download } from 'lucide-react';

const AdminPayments = () => {
  const mockPayments = [
    {
      id: 'PAY-001',
      orderId: 'ORD-001',
      customer: 'John Doe',
      amount: 129.99,
      method: 'Credit Card',
      status: 'Completed',
      date: new Date().toLocaleDateString(),
      transactionId: 'txn_1234567890'
    },
    {
      id: 'PAY-002',
      orderId: 'ORD-002',
      customer: 'Jane Smith',
      amount: 89.99,
      method: 'PayPal',
      status: 'Completed',
      date: new Date(Date.now() - 86400000).toLocaleDateString(),
      transactionId: 'txn_0987654321'
    },
    {
      id: 'PAY-003',
      orderId: 'ORD-003',
      customer: 'Bob Johnson',
      amount: 199.98,
      method: 'Credit Card',
      status: 'Pending',
      date: new Date(Date.now() - 172800000).toLocaleDateString(),
      transactionId: 'txn_1122334455'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout title="Payments">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-brand-chocolate">Payments</h1>
          <p className="text-brand-chocolate-light">Manage payment transactions</p>
        </div>

        {/* Payment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-brand-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-chocolate">$12,450.00</div>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Successful Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-brand-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-chocolate">98.5%</div>
              <p className="text-xs text-gray-600">Success rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-brand-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">5</div>
              <p className="text-xs text-gray-600">Awaiting processing</p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Credit Cards</p>
                  <p className="text-2xl font-bold text-brand-chocolate">65%</p>
                </div>
                <CreditCard className="h-8 w-8 text-brand-gold" />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">PayPal</p>
                  <p className="text-2xl font-bold text-brand-chocolate">30%</p>
                </div>
                <div className="h-8 w-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">P</div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Others</p>
                  <p className="text-2xl font-bold text-brand-chocolate">5%</p>
                </div>
                <DollarSign className="h-8 w-8 text-brand-gold" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payments Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Payments</CardTitle>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.orderId}</TableCell>
                    <TableCell>{payment.customer}</TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
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

export default AdminPayments;
