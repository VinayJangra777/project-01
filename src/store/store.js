import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlice.js';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;