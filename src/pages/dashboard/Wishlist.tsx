
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { userData } = useAuth();

  // This would typically be fetched from a database
  const wishlistItems = [];

  return (
    <DashboardLayout title="My Wishlist">
      <div className="space-y-6">
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Wishlist items would go here */}
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <Heart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Your wishlist is empty</h3>
            <p className="mt-1 text-gray-500">Save items you're interested in by clicking the heart icon on products.</p>
            <Link to="/products">
              <Button className="mt-4 bg-brand-purple hover:bg-brand-purple-dark">
                Explore Products
              </Button>
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Wishlist;
