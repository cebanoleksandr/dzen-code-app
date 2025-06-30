import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../utils/types';

interface UserState {
  items: User[];
}

const initialState: UserState = {
  items: []
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersAC: (state, action: { payload: User[] }) => {
      state.items = action.payload;
    },
  },
});

export const { setUsersAC } = userSlice.actions;
export default userSlice.reducer;
