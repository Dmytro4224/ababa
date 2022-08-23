import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { guid, IMovie } from '../../app/dataTypes';
import { RootState } from '../../app/store';
import { moviesApi } from '../api/moviesApi';

export interface MoviesState {
  items: IMovie[];
  status: 'idle' | 'loading' | 'failed' | 'complete';
  error: string | null;
};

const initialState: MoviesState = {
  items: [],
  status: 'idle',
  error: null
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addMatcher(moviesApi.endpoints.movies.matchFulfilled,
        (state, action) => {
          for (const movie of action.payload.data) {
            if (state.items.findIndex(x => x.id === movie.id) === -1) {
              state.items.push(movie);
            }
          }
        }
      )
      .addMatcher(moviesApi.endpoints.add.matchFulfilled,
        (state, action) => {
          const movie = action.payload.data;
          if (state.items.findIndex(x => x.id === movie.id) === -1) {
            state.items.push(movie);
          }
        }
      )
      .addMatcher(moviesApi.endpoints.delete.matchFulfilled,
        (state, action) => {
          //const index = state.items.findIndex(x => x.id === movie.id);
          //if (index !== -1) {
          //  state.items[index] = movie;
          //}
        }
      )
      .addMatcher(moviesApi.endpoints.get.matchFulfilled,
        (state, action) => {
          const movie = action.payload.data;
          const index = state.items.findIndex(x => x.id === movie.id);
          if (index !== -1) {
            state.items[index] = movie;
          }
          else {
            state.items.push(movie);
          }
        }
      )
  }
});

export const { } = moviesSlice.actions;

export const selectMovie = (hash: guid) => (state: RootState) => state.movies.items.find(x => x.hash === hash) || null;

export default moviesSlice.reducer;
