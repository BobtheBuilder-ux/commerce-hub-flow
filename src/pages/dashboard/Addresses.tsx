
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ShippingAddress } from '@/types';

const Addresses = () => {
  const { userData } = useAuth();
  const [open, setOpen] = useState(false);

  // This would typically be fetched from a database
  const addresses: ShippingAddress[] = [];

  return (
    <DashboardLayout title="My Addresses">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Saved Addresses</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-brand-purple hover:bg-brand-purple-dark">
                <Plus className="mr-2 h-4 w-4" /> Add New Address
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Address</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                {/* Address form would go here */}
                <p className="text-center text-gray-500">Address form to be implemented</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button className="bg-brand-purple hover:bg-brand-purple-dark">Save Address</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {addresses.length > 0 ? (
          <div className="grid gap-4">
            {addresses.map((address) => (
              <Card key={address.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    {address.isDefault && <span className="bg-brand-purple text-white text-xs px-2 py-0.5 rounded mr-2">Default</span>}
                    {address.addressLine1}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    {address.addressLine2 && <p>{address.addressLine2}</p>}
                    <p>{address.city}, {address.state} {address.postalCode}</p>
                    <p>{address.country}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <MapPin className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No addresses saved</h3>
            <p className="mt-1 text-gray-500">Add a shipping address to make checkout faster.</p>
            <Button 
              className="mt-4 bg-brand-purple hover:bg-brand-purple-dark"
              onClick={() => setOpen(true)}
            >
              Add Your First Address
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Addresses;
