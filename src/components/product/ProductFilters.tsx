
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
  categories?: string[];
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
  hasActiveFilters,
  categories = []
}) => {
  const handleCategoryChange = (value: string) => {
    if (value === "all") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([value]);
    }
  };

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
            value={selectedCategories.length > 0 ? selectedCategories[0] : 'all'} 
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="border-brand-beige-dark">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.filter(category => typeof category === 'string' && category.length > 0).map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
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
