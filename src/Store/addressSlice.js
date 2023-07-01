import { createSlice } from '@reduxjs/toolkit';

export const addressSlice = createSlice({
  name: 'address',
  initialState: '',
  reducers: {
    addAddress: (state, action) => {
      return [action.payload];
    },
  },
});

export const { addAddress } = addressSlice.actions;

export default addressSlice.reducer;