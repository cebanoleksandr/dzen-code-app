import { createSlice } from '@reduxjs/toolkit';
import type { Product } from '../utils/types';

interface OrdersState {
  items: Product[];
}

const initialState: OrdersState = {
  items: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsAC: (state, action: { payload: Product[] }) => {
      state.items = action.payload;
    },
  },
});

export const { setProductsAC } = productsSlice.actions;
export default productsSlice.reducer;
