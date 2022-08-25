import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IApiRequest, IApiResponse, tokenizeUrl } from '.';
import { guid, IMovie } from '../../app/dataTypes';
import { appSettings } from '../../app/settings';

export interface IMoviesResponse extends IApiResponse<IMovie[]> { }
export interface IMoviesRequest extends IApiRequest<undefined> { }

export interface IAddMovieRequest extends IApiRequest<{
  name: string;
  description: string | null;
  thumbnail: string | null;
  preview: string | null;
}> { }
export interface IAddMovieResponse extends IApiResponse<IMovie> { }

export interface IDeleteMovieRequest extends IApiRequest<{
  movieHash: guid;
}> { }
export interface IDeleteMovieResponse extends IApiResponse<{
  movieHash: guid;
  isRemoved: boolean;
}> { }

export interface IGetMovieRequest extends IApiRequest<{
  movieHash: guid;
}> { }
export interface IGetMovieResponse extends IApiResponse<IMovie> { }

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: appSettings.apiEndpoint,
    prepareHeaders: (headers, { getState }) => {
      headers.set('content-type', 'application/json; charset=utf-8');
      return headers;
    }
  }),
  endpoints: builder => ({
    movies: builder.mutation<IMoviesResponse, IMoviesRequest>({
      query: body => ({
        url: tokenizeUrl(body.token),
      })
    }),
    add: builder.mutation<IAddMovieResponse, IAddMovieRequest>({
      query: body => ({
        url: tokenizeUrl(body.token),
        method: 'POST',
        body: JSON.stringify(body.data)
      })
    }),
    delete: builder.mutation<IDeleteMovieResponse, IDeleteMovieRequest>({
      query: body => ({
        url: tokenizeUrl(body.token, '/movie/', body.data!.movieHash),
        method: 'DELETE',
      })
    }),
    get: builder.mutation<IGetMovieResponse, IGetMovieRequest>({
      query: request => ({
        url: tokenizeUrl(request.token, '/movie/', request.data!.movieHash)
      })
    })
  })
});

export const { useMoviesMutation, useAddMutation, useDeleteMutation, useGetMutation } = moviesApi;
