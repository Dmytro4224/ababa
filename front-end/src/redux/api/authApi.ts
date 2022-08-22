import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBaseResponse } from '.';

type guid = string;

/** 2022-08-19T16:27:11.838Z */
type date = string;
 

export interface ILoginRequest {
  login: string;
  pwd: string;
}
export interface ILoginResponse extends IBaseResponse<{
  sessionToken: guid;
  loginMessage: string;
  name: string;
  userToken: guid;
}> { }

export interface IRegisterRequest {
  login: string;
  pwd: string;
  name: string;
}
export interface IRegisterResponse extends IBaseResponse<{
  hash: guid;
  name: string;
  status: boolean;
  date: date
}> { }

export interface ISignoutRequest {
  sessionToken: string | null;
  userToken: string | null;
}
export interface ISignoutResponse extends IBaseResponse<{
  isLogOut: boolean;
}> { }

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers, { getState }) => {
      //const token = (getState() as RootState).auth.token
      //if (token) {
      //  headers.set('authorization', `Bearer ${token}`)
      //}
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signin: builder.mutation<ILoginResponse, ILoginRequest>({
      query: body => ({
        url: '/auth/signin',
        method: 'POST',
        body: JSON.stringify(body)
      }),
    }),
    signup: builder.mutation<IRegisterResponse, IRegisterRequest>({
      query: body => ({
        url: '/auth/signup',
        method: 'POST',
        body: JSON.stringify(body)
      })
    }),
    signout: builder.mutation<ISignoutResponse, ISignoutRequest>({
      query: body => `/auth/signout/${body.sessionToken}/${body.userToken}`
    })
  }),
})

export const { useSigninMutation, useSignupMutation, useSignoutMutation } = authApi;
