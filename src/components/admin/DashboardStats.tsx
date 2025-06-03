
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign,
  TrendingUp
} from 'lucide-react';

interface StatsProps {
  stats: {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    totalUsers: number;
  };
}

const DashboardStats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-4 w-4 text-brand-gold" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-brand-chocolate">{stats.totalProducts}</div>
          <p className="text-xs text-brand-chocolate-light">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            +12% from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <ShoppingCart className="h-4 w-4 text-brand-gold" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-brand-chocolate">{stats.totalOrders}</div>
          <p className="text-xs text-brand-chocolate-light">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            +8% from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-brand-gold" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-brand-chocolate">${stats.totalRevenue.toLocaleString()}</div>
          <p className="text-xs text-brand-chocolate-light">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            +15% from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-brand-gold" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-brand-chocolate">{stats.totalUsers}</div>
          <p className="text-xs text-brand-chocolate-light">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            +5% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
