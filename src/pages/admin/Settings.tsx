
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Save, Upload } from 'lucide-react';

const AdminSettings = () => {
  return (
    <AdminLayout title="Settings">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-brand-chocolate">Settings</h1>
          <p className="text-brand-chocolate-light">Manage your store settings</p>
        </div>

        {/* Store Information */}
        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="storeName">Store Name</Label>
                <Input id="storeName" defaultValue="ShopHub" />
              </div>
              <div>
                <Label htmlFor="storeEmail">Store Email</Label>
                <Input id="storeEmail" defaultValue="admin@shophub.com" />
              </div>
            </div>
            <div>
              <Label htmlFor="storeDescription">Store Description</Label>
              <Input id="storeDescription" defaultValue="Your one-stop shop for everything" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="storePhone">Phone Number</Label>
                <Input id="storePhone" defaultValue="+1 (555) 123-4567" />
              </div>
              <div>
                <Label htmlFor="storeAddress">Address</Label>
                <Input id="storeAddress" defaultValue="123 Commerce St, Business City" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable PayPal</Label>
                <p className="text-sm text-gray-500">Accept payments via PayPal</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Credit Cards</Label>
                <p className="text-sm text-gray-500">Accept credit card payments</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div>
              <Label htmlFor="currency">Default Currency</Label>
              <Input id="currency" defaultValue="USD" />
            </div>
            <div>
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input id="taxRate" defaultValue="8.25" />
            </div>
          </CardContent>
        </Card>

        {/* Shipping Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="shippingCost">Standard Shipping Cost</Label>
                <Input id="shippingCost" defaultValue="9.99" />
              </div>
              <div>
                <Label htmlFor="freeShipping">Free Shipping Threshold</Label>
                <Input id="freeShipping" defaultValue="100.00" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Free Shipping</Label>
                <p className="text-sm text-gray-500">Offer free shipping above threshold</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Order Notifications</Label>
                <p className="text-sm text-gray-500">Get notified when new orders are placed</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Low Stock Alerts</Label>
                <p className="text-sm text-gray-500">Get alerted when products are low in stock</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Customer Messages</Label>
                <p className="text-sm text-gray-500">Get notified of customer inquiries</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="bg-brand-gold hover:bg-brand-gold-dark text-brand-chocolate">
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
