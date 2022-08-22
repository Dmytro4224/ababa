import React, { useEffect } from 'react';
import { IMovie } from '../../api/moviesApi';
import { MovieListItem } from './MovieListItem';

interface IMoviesList {
  movies: IMovie[];
}

export const MoviesList = ({ movies }: IMoviesList) => {

  return (
    <div>
      {movies.map(x => <MovieListItem movie={x} key={`MoviesList-${x.id}`} />)}
    </div>
  )
}
