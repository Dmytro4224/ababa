import { createSlice } from '@reduxjs/toolkit';
import { IToken, removeToken, setToken } from '../../app/useAuth';
import { authApi } from '../api/authApi';

export interface AuthState {
  isAuth: boolean | null;
  sessionToken: string | null;
  userToken: string | null;
  status: 'idle' | 'loading' | 'failed' | 'complete';
};

const initialState: AuthState = {
  isAuth: null,
  sessionToken: null,
  userToken: null,
  status: 'idle',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    validateToken: (state, { payload }: { payload: IToken | null }) => {
      if (payload !== null) {
        state.isAuth = true;
        state.sessionToken = payload.sessionToken;
        state.userToken = payload.userToken;
      }
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(authApi.endpoints.signin.matchFulfilled,
        (state, action) => {
          const isAuth = action.payload.statusCode === 200;
          state.isAuth = isAuth;
          state.sessionToken = isAuth ? action.payload.data.sessionToken : null;
          state.userToken = isAuth ? action.payload.data.userToken : null;
          if (isAuth) {
            setToken(action.payload.data.sessionToken, action.payload.data.userToken);
          }
        }
      )
      .addMatcher(authApi.endpoints.signup.matchFulfilled,
        (state, action) => {
          const { statusCode, data } = action.payload;

        }
      )
      .addMatcher(authApi.endpoints.signout.matchFulfilled,
        (state, action) => {
          console.log('signout', action);
          state.isAuth = false;
          state.sessionToken = null;
          state.userToken = null;
          state.status = 'idle';
          removeToken();
        }
      )
  },
});

export const { validateToken } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

//export const isAuth = (state: RootState) => state.auth.token !== null;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
//export const incrementIfOdd = (amount: number): AppThunk => (dispatch, getState) => {
//    const currentValue = isAuth(getState());
//    if (currentValue % 2 === 1) {
//        dispatch(incrementByAmount(amount));
//    }
//};

export default authSlice.reducer;
