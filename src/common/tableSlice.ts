import {
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { CountryData, EmissionsData } from './types';
import type { RootState } from './store';

interface AppStore {
  table: EmissionsData;
  filters: Filters;
}

export interface Filters {
  selectedYear?: number;
  countryName?: string;
}

const initialState: AppStore = {
  table: {},
  filters: {
    selectedYear: undefined,
    countryName: undefined,
  },
};

export const tableSlice = createSlice({
  name: 'tableState',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<EmissionsData>) => {
      state.table = action.payload;
    },
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export default tableSlice.reducer;

export const { setData, setFilters } = tableSlice.actions;
export const selectTable = (state: RootState) => state.tableState.table;
export const selectFilters = (state: RootState) => state.tableState.filters;
export const selectByYear = createSelector(
  [selectTable, selectFilters],
  (data, filter) => {
    if (!filter.countryName && !filter.selectedYear) return data;

    let newData: Record<string, CountryData> = {};
    if (filter.countryName) {
      const matches = Object.keys(data).filter((name) => {
        const filtered = filter.countryName
          ? name.toLowerCase().startsWith(filter.countryName.toLowerCase())
          : true;
        return filtered;
      });
      matches.map((c) => (newData[c] = { ...data[c] }));
    }

    if (filter.selectedYear) {
      newData =
        Object.keys(newData).length > 0 ? newData : structuredClone(data);
      Object.keys(newData).forEach(
        (country) =>
          (newData[country].data = newData[country].data.filter(
            (d) => d.year == filter.selectedYear
          ))
      );
    }
    return newData;
  }
);
