import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../common/store';

export interface SearchTerm {
  value: string;
}

const initialState: SearchTerm = {
  value: '',
};

export const searchTermSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export default searchTermSlice.reducer;

export const { setSearchTerm } = searchTermSlice.actions;
export const selectSearchTerm = (state: RootState) => state.search.value;
