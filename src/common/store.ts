import { combineReducers, configureStore } from '@reduxjs/toolkit';
import selectedReducer from '../components/SearchResult/selectedSlice';
import searchReducer from '../components/Search/searchSlice';
import { api } from './moviesApi';

const rootReducer = combineReducers({
  selectedMovies: selectedReducer,
  [api.reducerPath]: api.reducer,
  search: searchReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
