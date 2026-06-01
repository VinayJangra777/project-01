import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],              
  selectedSizes: [],      
  sortBy: 'none',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortBy = action.payload;
    },
   
    toggleSizeFilter: (state, action) => {
      const size = action.payload;
    
      if (state.selectedSizes.includes(size)) {
        state.selectedSizes = state.selectedSizes.filter(s => s !== size);
      } else {
        state.selectedSizes.push(size);
      }
    }
  }
});

export const selectSortedProducts = (state) => {
  if (!state.products || !state.products.items) return [];

  const { items, sortBy, selectedSizes } = state.products;
  let filteredItems = [...items];

  if (selectedSizes && selectedSizes.length > 0) {
    filteredItems = filteredItems.filter(product =>
      product.availableSizes.some(size => selectedSizes.includes(size))
    );
  }

  
  if (sortBy === 'low-to-high') {
    return [...filteredItems].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } 
  
  if (sortBy === 'high-to-low') {
    return [...filteredItems].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }

  return filteredItems; 
};


export const { setProducts, setSortOrder, toggleSizeFilter } = productSlice.actions;
export default productSlice.reducer;