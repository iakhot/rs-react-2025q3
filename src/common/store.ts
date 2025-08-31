import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tableReducer from '../common/tableSlice';
import columnReducer from '../common/columnSlice';

const rootReducer = combineReducers({
  tableState: tableReducer,
  columnState: columnReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
