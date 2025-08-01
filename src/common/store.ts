import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from '../components/SearchResult/selectedSlice';

export const store = configureStore({
  reducer: {
    selectedMovies: selectedReducer,
  },
});

// Infer the type of `store`
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];
