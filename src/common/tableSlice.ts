import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CountryData, EmissionsData } from "./types";
import type { RootState } from "./store";


interface AppStore {
    table: EmissionsData;
    filters: Filters;
}

export interface Filters {
    selectedYear?: number;
}

const initialState: AppStore = {
    table: {},
    filters: {
        selectedYear: undefined,
    }
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
        }
    },
});

export default tableSlice.reducer;

export const { setData, setFilters } = tableSlice.actions;
export const selectTable = (state: RootState) => state.tableState.table;
export const selectFilters = (state: RootState) => state.tableState.filters;
export const selectByYear = createSelector([selectTable, selectFilters], (data, filter) => {
    if (filter.selectedYear) {
        const newData: Record<string, CountryData> = {};
        Object.keys(data).forEach((country) =>
            newData[country] = { ...data[country], data: data[country].data.filter((d) => d.year == filter.selectedYear) }
        );
        return newData;
    }
    return data;
});