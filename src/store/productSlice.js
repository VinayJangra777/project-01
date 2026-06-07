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


export const { setProducts, setSortOrder, toggleSizeFilter } = productSlice.actions;
export default productSlice.reducer;