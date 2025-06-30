import { createSlice } from '@reduxjs/toolkit';
import type { Order } from '../utils/types';

interface OrdersState {
  items: Order[];
}

const initialState: OrdersState = {
  items: [],
};

const postsSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrdersAC: (state, action: { payload: Order[] }) => {
      state.items = action.payload;
    },
  },
});

export const { setOrdersAC } = postsSlice.actions;
export default postsSlice.reducer;
