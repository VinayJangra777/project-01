import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSelector, useDispatch } from 'react-redux';
import Filters from './Filters';


vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));


vi.mock('../constants/sizes', () => ({
  availableSizes: ['S', 'M', 'L', 'XL'],
}));

describe('Filters Component', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    vi.clearAllMocks();
  });

  
  it('should render all available size buttons correctly with no sizes selected', () => {
  
    useSelector.mockReturnValue([]);

    render(<Filters />);

    expect(screen.getByText('Sizes:')).toBeInTheDocument();

    
    expect(screen.getByRole('button', { name: 'S' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'M' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'L' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'XL' })).toBeInTheDocument();

  
    const smallButton = screen.getByRole('button', { name: 'S' });
    expect(smallButton).not.toHaveClass('active');
  });

  
  it('should add the active class to buttons whose sizes are stored in the selected array', () => {
   
    useSelector.mockReturnValue(['M', 'XL']);

    render(<Filters />);


    expect(screen.getByRole('button', { name: 'M' })).toHaveClass('active');
    expect(screen.getByRole('button', { name: 'XL' })).toHaveClass('active');


    expect(screen.getByRole('button', { name: 'S' })).not.toHaveClass('active');
    expect(screen.getByRole('button', { name: 'L' })).not.toHaveClass('active');
  });


  it('should trigger dispatch toggleSizeFilter with correct size payload when a button is clicked', async () => {

    useSelector.mockReturnValue([]);

    render(<Filters />);

  
    const user = userEvent.setup();
    
    
    const mediumButton = screen.getByRole('button', { name: 'M' });

    await user.click(mediumButton);

   
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'products/toggleSizeFilter', 
      payload: 'M'
    });
  });
});