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
            if (state.items.findIndex(x => x.hash === movie.hash) === -1) {
              state.items.push(movie);
            }
          }

          state.status = 'complete';
        }
      )
      .addMatcher(moviesApi.endpoints.add.matchFulfilled,
        (state, action) => {
          const movie = action.payload.data;
          if (state.items.findIndex(x => x.hash === movie.hash) === -1) {
            state.items.push(movie);
          }
        }
      )
      .addMatcher(moviesApi.endpoints.delete.matchFulfilled,
        (state, action) => {
          const movieHash = action.payload.data.movieHash;
          const index = state.items.findIndex(x => x.hash === movieHash);
          if (index !== -1) {
            state.items.splice(index, 1);
          }
        }
      )
      .addMatcher(moviesApi.endpoints.get.matchFulfilled,
        (state, action) => {
          const movie = action.payload.data;
          const index = state.items.findIndex(x => x.hash === movie.hash);
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
