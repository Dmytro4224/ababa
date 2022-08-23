import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { IToken, removeToken, setToken } from '../../app/useAuth';
import { authApi } from '../api/authApi';

export interface AuthState {
  isAuth: boolean | null;
  sessionToken: string | null;
  userToken: string | null;
  userName: string | null;
  status: 'idle' | 'loading' | 'failed' | 'complete';
};

const initialState: AuthState = {
  isAuth: null,
  sessionToken: null,
  userToken: null,
  userName: null,
  status: 'idle',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    validateToken: (state, action: PayloadAction<IToken | null>) => {
      if (action.payload !== null) {
        state.isAuth = true;
        state.sessionToken = action.payload.sessionToken;
        state.userToken = action.payload.userToken;
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
          state.userName = isAuth ? action.payload.data.name : null;
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

export const selectToken = (state: RootState) => {
  return {
    sessionToken: state.auth.sessionToken!,
    userToken: state.auth.userToken!
  } as IToken
}

export const selectUserName = (state: RootState) => state.auth.userName;

export default authSlice.reducer;
