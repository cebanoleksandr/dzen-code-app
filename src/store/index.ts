import { configureStore } from "@reduxjs/toolkit";
import ordersSlice from './ordersSlice';
import alertSlice from './alertSlice';
import userSlice from './userSlice';
import usersSlice from './usersSlice';
import productsSlice from './productsSlice';
import searchSlice from './searchSlice';

export const store = configureStore({
  reducer: {
    orders: ordersSlice,
    alert: alertSlice,
    user: userSlice,
    users: usersSlice,
    products: productsSlice,
    search: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
