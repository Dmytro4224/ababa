import { request } from 'https';
import { fetchData } from '../app/fetch'
import { sleep } from '../helpers/misc';
import { IBaseResponse } from './api';

export interface IMovie {
  id: number;
  name: string;
  title: string;
}

export interface IDetailMovie extends IMovie {
  description: string;
}

export interface IMoviesResponse extends IBaseResponse<IMovie[]> {
}

export interface IMovieResponse extends IBaseResponse<IDetailMovie> {
}

export interface IMoviesRequest {
  id?: number;
}

export interface IAddNewMovieRequest {
  name: string;
  title: string;
  description: string;
}

export interface IAddNewMovieResponse extends IBaseResponse<IDetailMovie> {
}

export const moviesApi = {
  load: async (request: IMoviesRequest) => {
    await sleep(2000);
    const response = await fetchData<IMoviesResponse>('/movies');
    return response;
  },
  detail: async (request: IMoviesRequest) => {
    await sleep(1000);
    const response = await fetchData<IMovieResponse>('/movies/1');
    return response;
  },
  create: async (request: IAddNewMovieRequest) => {
    await sleep(1000);
    const response = await fetchData<IAddNewMovieResponse>('/add');
    return response;
  }
}
