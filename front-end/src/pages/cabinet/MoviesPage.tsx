import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { MoviesList } from '../../components/cabinet/MoviesList';
import { useMoviesMutation } from '../../redux/api/moviesApi';
import { selectToken } from '../../redux/slices/authSlice';

export interface IMoviesPage {
}

export const MoviesPage = ({ }: IMoviesPage) => {

  const movies = useAppSelector(state => state.movies.items);
  const token = useAppSelector(selectToken);
  const [load, { isLoading }] = useMoviesMutation();

  useEffect(() => {
    if (movies.length === 0) {
      load({ token });
    }
  }, []);

  if (isLoading) {
    return (
      <div>
        Loading movie...
      </div>
    )
  }

  return (
    <div>
      <MoviesList
        movies={movies}
      />
    </div>
  )
}
