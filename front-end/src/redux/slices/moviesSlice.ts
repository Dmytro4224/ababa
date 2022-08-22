import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDetailMovie, IMovie, IMovieResponse, IMoviesResponse } from '../../api/moviesApi';
import { RootState } from '../../app/store';

export interface MoviesState {
  short: IMovie[];
  detail: IDetailMovie[];
  status: 'idle' | 'loading' | 'failed' | 'complete';
  error: string | null;
};

const initialState: MoviesState = {
  short: [],
  detail: [],
  status: 'idle',
  error: null
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    catalog: (state, action: PayloadAction<IMoviesResponse>) => {
      for (const movie of action.payload.data) {
        if (state.short.findIndex(x => x.id === movie.id) === -1) {
          state.short.push(movie);
        }
      }
    },
    detail: (state, action: PayloadAction<IMovieResponse>) => {
      const index = state.detail.findIndex(x => x.id === action.payload.data.id);
      if (index !== -1) {
        state.detail[index] = action.payload.data;
      }
      else {
        state.detail.push(action.payload.data);
      }
    }
  },
});

export const { catalog, detail } = moviesSlice.actions;

export const findShortMovie = (id: number) => (state: RootState) => state.movies.short.find(x => x.id === id) || null;
export const findDetailMovie = (id: number) => (state: RootState) => state.movies.detail.find(x => x.id === id) || null;

export default moviesSlice.reducer;
