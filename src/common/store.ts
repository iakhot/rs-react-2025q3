import { combineReducers, configureStore } from '@reduxjs/toolkit';
import selectedReducer from '../components/SearchResult/selectedSlice';

const rootReducer = combineReducers({
  selectedMovies: selectedReducer,
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
