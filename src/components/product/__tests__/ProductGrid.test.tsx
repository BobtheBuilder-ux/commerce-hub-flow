
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductGrid from '../ProductGrid';
import { Product } from '@/types';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    description: 'Description 1',
    price: 99.99,
    images: ['/placeholder.svg'],
    category: 'Electronics',
    inventory: 10,
    featured: true,
    averageRating: 4.5,
    reviews: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'Description 2',
    price: 149.99,
    images: ['/placeholder.svg'],
    category: 'Clothing',
    inventory: 5,
    featured: false,
    averageRating: 4.0,
    reviews: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ProductGrid', () => {
  it('renders all products', () => {
    renderWithRouter(<ProductGrid products={mockProducts} />);
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    renderWithRouter(<ProductGrid products={[]} isLoading={true} />);
    
    expect(screen.getAllByTestId('product-skeleton')).toHaveLength(8);
  });

  it('shows empty state when no products', () => {
    renderWithRouter(<ProductGrid products={[]} isLoading={false} />);
    
    expect(screen.getByText('No products found')).toBeInTheDocument();
  });
});
