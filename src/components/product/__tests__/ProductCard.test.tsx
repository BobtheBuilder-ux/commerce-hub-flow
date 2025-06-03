
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { Product } from '@/types';
import { describe, it, expect } from 'vitest';

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  description: 'Test description',
  price: 99.99,
  salePrice: 79.99,
  images: ['/placeholder.svg'],
  category: 'Electronics',
  inventory: 10,
  featured: true,
  averageRating: 4.5,
  reviews: [],
  createdAt: Date.now(),
  updatedAt: Date.now()
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    renderWithRouter(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('$79.99')).toBeInTheDocument();
  });

  it('shows out of stock when inventory is 0', () => {
    const outOfStockProduct = { ...mockProduct, inventory: 0 };
    renderWithRouter(<ProductCard product={outOfStockProduct} />);
    
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });
});
