import { createSlice } from '@reduxjs/toolkit';

interface SearchState {
  item: string;
}

const initialState: SearchState = {
  item: '',
};

const productsSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchAC: (state, action: { payload: string }) => {
      state.item = action.payload;
    },
  },
});

export const { setSearchAC } = productsSlice.actions;
export default productsSlice.reducer;
