import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSelector, useDispatch } from 'react-redux';
import CartSidebar from './CartSidebar';


vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

describe('CartSidebar Component', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
  });

  it('should display empty message when there are no items in the cart', () => {
   
    useSelector.mockReturnValue([]);

    render(<CartSidebar isOpen={true} onClose={vi.fn()} />);

    
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    expect(screen.queryByText('CHECKOUT')).not.toBeInTheDocument();
  });

  it('should list items and calculate subtotal correctly based on items',  () => {
    
    useSelector.mockReturnValue([
      { id: '1', title: 'Vintage Jacket', price: 50, quantity: 2, sku: '123', currencyFormat: '$' }
    ]);

    render(<CartSidebar isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByText('Vintage Jacket')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
    
  
    expect(screen.getByText('Subtotal : $ 100.00')).toBeInTheDocument();
    expect(screen.getByText('CHECKOUT')).toBeInTheDocument();
  });

  it('should trigger dispatch when remove button is clicked', async () => {
    useSelector.mockReturnValue([
      { id: '101', title: 'Shoes', price: 80, quantity: 1, sku: '456', currencyFormat: '$' }
    ]);

    render(<CartSidebar isOpen={true} onClose={vi.fn()} />);
    
    
    const user = userEvent.setup();
    const removeButton = screen.getByRole('button', { name: /remove item/i });
    
    await user.click(removeButton);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});