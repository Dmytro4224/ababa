import { authApi } from './authApi';
import { moviesApi } from './moviesApi';

export interface IBaseResponse<T> {
  statusCode: number;
  statusMessage: string;
  data: T;
}

const api = {
  auth: authApi,
  movies: moviesApi
}

export default api;
