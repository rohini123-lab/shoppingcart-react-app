import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import addressReducer from './addressSlice';
import cardReducer from './cardSlice';

export default configureStore({
  reducer: {
    products: productReducer,
    address: addressReducer,
    card:cardReducer,
  },
});