
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const RecentOrders = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Latest customer orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>#ORD-001</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>$129.99</TableCell>
              <TableCell>
                <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
              </TableCell>
              <TableCell>{new Date().toLocaleDateString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>#ORD-002</TableCell>
              <TableCell>Jane Smith</TableCell>
              <TableCell>$89.99</TableCell>
              <TableCell>
                <Badge className="bg-green-100 text-green-800">Shipped</Badge>
              </TableCell>
              <TableCell>{new Date(Date.now() - 86400000).toLocaleDateString()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
