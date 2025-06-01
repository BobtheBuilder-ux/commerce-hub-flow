
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface ProductFiltersProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  showOnlyInStock: boolean;
  setShowOnlyInStock: (value: boolean) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  sortBy,
  setSortBy,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  showOnlyInStock,
  setShowOnlyInStock,
  onClearFilters,
  hasActiveFilters
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-brand-beige-dark">
      <h3 className="text-lg font-semibold text-brand-chocolate mb-4">Filters</h3>
      
      <div className="space-y-6">
        {/* Sort Options */}
        <div>
          <label className="block text-sm font-medium text-brand-chocolate mb-2">Sort By</label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="border-brand-beige-dark">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-brand-chocolate mb-2">Category</label>
          <Select 
            value={selectedCategories[0] || ''} 
            onValueChange={(value) => setSelectedCategories(value ? [value] : [])}
          >
            <SelectTrigger className="border-brand-beige-dark">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="home-kitchen">Home & Kitchen</SelectItem>
              <SelectItem value="fitness">Fitness</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="jewelry">Jewelry</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-brand-chocolate mb-2">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <Slider 
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={1000}
            step={10}
            className="w-full"
          />
        </div>
        
        {/* Stock Filter */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="inStock" 
            checked={showOnlyInStock}
            onCheckedChange={(checked) => setShowOnlyInStock(!!checked)}
          />
          <label htmlFor="inStock" className="text-sm font-medium text-brand-chocolate">
            In stock only
          </label>
        </div>
        
        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            onClick={onClearFilters} 
            className="w-full border-brand-chocolate text-brand-chocolate hover:bg-brand-chocolate hover:text-white"
          >
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;
