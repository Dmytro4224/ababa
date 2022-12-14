import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authApi } from '../redux/api/authApi';
import { moviesApi } from '../redux/api/moviesApi';
import authReducer from '../redux/slices/authSlice';
import moviesReducer from '../redux/slices/moviesSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
    auth: authReducer,
    movies: moviesReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
