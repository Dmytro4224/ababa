/*import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../app/store';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),
  }),
})

export const { useLoginMutation, useProtectedMutation } = api;
*/

import { sleep } from '../helpers/misc'
import { IBaseResponse } from './api';

export interface ILoginResponse extends IBaseResponse<{ name: string; token: string; }> {
  data: {
    name: string;
    token: string;
  }
}

export interface ILoginRequest {
  login: string;
  password: string;
}

export interface IRegisterRequest {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IRegisterResponse extends IBaseResponse<{ token: string; name: string }>{
}

export interface IValidateRequest {
  token: string;
}

export interface IValidateResponse extends IBaseResponse<{}> {
}

export const authApi = {
  validate: async (data: IValidateRequest) => {
    await sleep(1000);
    const response: IValidateResponse = {
      statusCode: 200,
      statusMessage: 'success',
      data: {
        name: 'Test',
        token: Date.now().toString()
      }
    };
    return response;
  },
  login: async (data: ILoginRequest) => {
    await sleep(500);
    const response: ILoginResponse = {
      statusCode: 200,
      statusMessage: 'success',
      data: {
        name: 'Test',
        token: Date.now().toString()
      }
    };
    return response;
  },
  register: async (data: IRegisterRequest) => {
    await sleep(1000);
    const response: IRegisterResponse = {
      statusCode: 200,
      statusMessage: 'success',
      data: {
        name: 'Test',
        token: Date.now().toString()
      }
    };
    return response;
  }
}
