import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface ColumnStore {
  displayColumns: string[];
}

export const initialState: ColumnStore = {
  displayColumns: ['year', 'population', 'co2', 'co2_per_capita'],
};

export const columnSlice = createSlice({
  name: 'columnState',
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<string[]>) => {
      state.displayColumns = [
        ...initialState.displayColumns,
        ...action.payload,
      ];
    },
  },
});

export default columnSlice.reducer;

export const { setColumns } = columnSlice.actions;
export const selectDisplayColumns = (state: RootState) =>
  state.columnState.displayColumns;
