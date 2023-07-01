import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      return [...state, action.payload];
    },
    removeProduct: (state, action) => {
      //return [...state, action.payload];
      return state.filter((product) => product.id !== action.payload.id);
    },
    removeAll: (state, action) => {
      return [];
    }
  },
});

export const { addProduct, removeProduct, removeAll } = productSlice.actions;

export default productSlice.reducer;