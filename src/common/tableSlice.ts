import {
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { CountryData } from './types';
import type { RootState } from './store';
import { sortData } from './utils';

interface AppStore {
  table: CountryData[];
  filters: Filters;
  sort: Sort;
}

export interface Filters {
  selectedYear?: number;
  countryName?: string;
}

export const OrderValues = ['asc', 'desc'] as const;
export type Order = (typeof OrderValues)[number];

export interface Sort {
  column: string;
  order: Order;
}

const initialState: AppStore = {
  table: [],
  filters: {
    selectedYear: undefined,
    countryName: undefined,
  },
  sort: {
    column: 'name',
    order: 'asc',
  },
};

export const tableSlice = createSlice({
  name: 'tableState',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Array<CountryData>>) => {
      state.table = action.payload;
    },
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = { ...action.payload };
    },
  },
});

export default tableSlice.reducer;

export const { setData, setFilters, setSort } = tableSlice.actions;
export const selectTable = (state: RootState) => state.tableState.table;
export const selectFilters = (state: RootState) => state.tableState.filters;
export const selectSort = (state: RootState) => state.tableState.sort;
export const selectByYear = createSelector(
  [selectTable, selectFilters, selectSort],
  (data, filter, sort) => {
    if (!filter.countryName && !filter.selectedYear && !sort) return data;

    let temp: CountryData[] = [];
    const country = filter.countryName;
    if (country) {
      temp = data.filter((item: CountryData) =>
        item.name?.toLowerCase().startsWith(country.toLowerCase())
      );
    }
    if (filter.selectedYear) {
      temp = temp.length > 0 ? temp : structuredClone(data);
      temp = temp.map((item) => {
        return {
          ...item,
          data: item.data.filter((y) => y.year == filter.selectedYear),
        };
      });
    }
    if (sort) {
      temp = temp.length > 0 ? temp : structuredClone(data);
      console.log(JSON.stringify(sort));
      temp = sortData(temp, sort);
    }
    return temp;
  }
);
