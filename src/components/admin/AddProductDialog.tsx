
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { addProduct } from '@/services/adminProductService';
import { ProductVariation } from '@/types';
import { Plus, Trash2 } from 'lucide-react';

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductAdded: () => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({
  open,
  onOpenChange,
  onProductAdded
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    salePrice: '',
    category: '',
    inventory: '',
    featured: false
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [variations, setVariations] = useState<Omit<ProductVariation, 'id'>[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Use mock categories instead of fetching from external API to avoid errors
        const mockCategories = [
          'electronics',
          'clothing',
          'home-kitchen',
          'fitness',
          'books',
          'beauty',
          'sports',
          'toys',
          'automotive',
          'jewelry'
        ];
        setCategories(mockCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback to default categories
        setCategories(['electronics', 'clothing', 'home-kitchen', 'fitness', 'books']);
      }
    };

    if (open) {
      fetchCategories();
    }
  }, [open]);

  const addVariation = () => {
    setVariations([...variations, { name: '', value: '', price: 0, inventory: 0 }]);
  };

  const removeVariation = (index: number) => {
    setVariations(variations.filter((_, i) => i !== index));
  };

  const updateVariation = (index: number, field: string, value: string | number) => {
    const updatedVariations = [...variations];
    updatedVariations[index] = { ...updatedVariations[index], [field]: value };
    setVariations(updatedVariations);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideoFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const variationsWithIds = variations.map((variation, index) => ({
        ...variation,
        id: `var_${Date.now()}_${index}`
      }));

      await addProduct({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        salePrice: formData.salePrice ? parseFloat(formData.salePrice) : undefined,
        category: formData.category,
        inventory: parseInt(formData.inventory),
        featured: formData.featured,
        images: [],
        videos: [],
        variations: variationsWithIds,
        subcategory: '',
        averageRating: 0,
        reviews: []
      }, imageFiles, videoFiles);

      toast({
        title: "Success",
        description: "Product added successfully",
      });

      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        salePrice: '',
        category: '',
        inventory: '',
        featured: false
      });
      setImageFiles([]);
      setVideoFiles([]);
      setVariations([]);
      onProductAdded();
      onOpenChange(false);
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the product details below including variations and media.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="salePrice">Sale Price ($)</Label>
                    <Input
                      id="salePrice"
                      type="number"
                      step="0.01"
                      value={formData.salePrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, salePrice: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => {
                          // Ensure category is a string and handle any non-string values
                          const categoryStr = typeof category === 'string' ? category : String(category);
                          const displayName = categoryStr.charAt(0).toUpperCase() + categoryStr.slice(1).replace('-', ' ');
                          
                          return (
                            <SelectItem key={categoryStr} value={categoryStr}>
                              {displayName}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="inventory">Inventory</Label>
                    <Input
                      id="inventory"
                      type="number"
                      value={formData.inventory}
                      onChange={(e) => setFormData(prev => ({ ...prev, inventory: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>
              </CardContent>
            </Card>

            {/* Media Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="images">Product Images</Label>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                  />
                  <p className="text-sm text-gray-500 mt-1">Select multiple images (first image will be the main image)</p>
                </div>
                <div>
                  <Label htmlFor="videos">Product Videos</Label>
                  <Input
                    id="videos"
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={handleVideoChange}
                  />
                  <p className="text-sm text-gray-500 mt-1">Upload product demonstration videos</p>
                </div>
              </CardContent>
            </Card>

            {/* Product Variations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Product Variations
                  <Button type="button" variant="outline" size="sm" onClick={addVariation}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Variation
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {variations.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No variations added yet</p>
                ) : (
                  <div className="space-y-4">
                    {variations.map((variation, index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 p-4 border rounded-lg">
                        <div>
                          <Label>Variation Name</Label>
                          <Input
                            value={variation.name}
                            onChange={(e) => updateVariation(index, 'name', e.target.value)}
                            placeholder="e.g., Size, Color"
                          />
                        </div>
                        <div>
                          <Label>Value</Label>
                          <Input
                            value={variation.value}
                            onChange={(e) => updateVariation(index, 'value', e.target.value)}
                            placeholder="e.g., Large, Red"
                          />
                        </div>
                        <div>
                          <Label>Price Modifier ($)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={variation.price}
                            onChange={(e) => updateVariation(index, 'price', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="flex items-end">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeVariation(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
