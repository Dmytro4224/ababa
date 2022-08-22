import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import moviesReducer from '../redux/slices/moviesSlice';

export const store = configureStore({
  reducer: {
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
