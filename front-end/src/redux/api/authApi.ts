import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IApiResponse } from '.';
import { date, guid } from '../../app/dataTypes';
import { appSettings } from '../../app/settings';
 
export interface ILoginRequest {
  login: string;
  pwd: string;
}
export interface ILoginResponse extends IApiResponse<{
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
export interface IRegisterResponse extends IApiResponse<{
  hash: guid;
  name: string;
  status: boolean;
  date: date
}> { }

export interface ISignoutRequest {
  sessionToken: string | null;
  userToken: string | null;
}
export interface ISignoutResponse extends IApiResponse<{
  isLogOut: boolean;
}> { }

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: appSettings.apiEndpoint,
    prepareHeaders: (headers, { getState }) => {
      headers.set('content-type', 'application/json; charset=utf-8');
      return headers;
    }
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
});

export const { useSigninMutation, useSignupMutation, useSignoutMutation } = authApi;
