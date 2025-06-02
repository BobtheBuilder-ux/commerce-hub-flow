
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockProducts = [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 89.99,
      inventory: 23,
      category: 'Electronics',
      status: 'Active',
      image: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      price: 129.99,
      inventory: 15,
      category: 'Electronics',
      status: 'Active',
      image: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'Wireless Earbuds',
      price: 59.99,
      inventory: 0,
      category: 'Electronics',
      status: 'Out of Stock',
      image: '/placeholder.svg'
    }
  ];

  return (
    <AdminLayout title="Products">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-brand-chocolate">Products</h1>
            <p className="text-brand-chocolate-light">Manage your product inventory</p>
          </div>
          <Button className="bg-brand-gold hover:bg-brand-gold-dark text-brand-chocolate">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Products ({mockProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Inventory</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="h-10 w-10 rounded object-cover"
                        />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.inventory}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={product.inventory > 0 ? "default" : "destructive"}
                        className={product.inventory > 0 ? "bg-green-100 text-green-800" : ""}
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
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

export default AdminProducts;
