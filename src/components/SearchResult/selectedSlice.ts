import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../common/store';

export interface SelectedState {
  selectedMovies: number[]; //Array<Movie>;
}

const initialState: SelectedState = {
  selectedMovies: [],
};

export const selectedSlice = createSlice({
  name: 'selectedMovies',
  initialState,
  reducers: {
    selectMovie: (state, action: PayloadAction<number>) => {
      state.selectedMovies.push(action.payload);
    },
    unselectMovie: (state, action: PayloadAction<number>) => {
      state.selectedMovies = state.selectedMovies.filter(
        (m) => m !== action.payload
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

export const selectedMovies = (state: RootState) =>
  state.selectedMovies.selectedMovies;
// export const selectedMovieIds = createSelector(selectedMovies, (movies) => {
//   return movies.map((m) => m.id);
// });
