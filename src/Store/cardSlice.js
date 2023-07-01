import { createSlice } from '@reduxjs/toolkit';

export const cardSlice = createSlice({
  name: 'card',
  initialState: '',
  reducers: {
    addCard: (state, action) => {
      return [action.payload];
    },
  },
});

export const { addCard } = cardSlice.actions;

export default cardSlice.reducer;