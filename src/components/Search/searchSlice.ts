import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../common/store';
import { LS_KEYS } from '../../common/types';

export interface SearchTerm {
  value: string;
}

const savedSearchTerm = localStorage.getItem(LS_KEYS.term) || '';

const initialState: SearchTerm = {
  value: savedSearchTerm,
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
