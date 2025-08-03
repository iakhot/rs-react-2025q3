import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../common/store';
import type { Movie } from '../../App';

export interface SelectedState {
  selectedMovies: Array<Movie>;
}

const initialState: SelectedState = {
  selectedMovies: [],
};

export const selectedSlice = createSlice({
  name: 'selectedMovies',
  initialState,
  reducers: {
    selectMovie: (state, action: PayloadAction<Movie>) => {
      state.selectedMovies.push(action.payload);
    },
    unselectMovie: (state, action: PayloadAction<number>) => {
      state.selectedMovies = state.selectedMovies.filter(
        (m) => m.id !== action.payload
      );
    },
    unselectAll: (state) => {
      state.selectedMovies = [];
    },
  },
});

export const { selectMovie, unselectMovie, unselectAll } =
  selectedSlice.actions;

export default selectedSlice.reducer;

// selectors

export const selectedMovies = (state: RootState) =>
  state.selectedMovies.selectedMovies;
export const selectedMovieIds = createSelector(selectedMovies, (movies) => {
  return movies.map((m) => m.id);
});
