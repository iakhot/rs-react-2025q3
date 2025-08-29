import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { EmissionsData } from "./types";
import type { RootState } from "./store";


interface AppStore {
    table: EmissionsData;
    filters: Filters;
}

interface Filters {
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
            console.log(`==== action ${action.payload['Austria'].data.length}`);
            state.table = action.payload;
        },
    },
});

export default tableSlice.reducer;

export const { setData } = tableSlice.actions;
export const selectTableData = (state: RootState) => state.tableState.table;
//export const selectByYear = (state: RootState) => state.table;