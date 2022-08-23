import React, { useEffect } from 'react';
import { IMovie } from '../../app/dataTypes';
import { MovieListItem } from './MovieListItem';
import cabinetStyles from '../../styles/cabinet.module.css';
import formStyles from '../../styles/form.module.css';

interface IMoviesList {
  movies: IMovie[];
}

export const MoviesList = ({ movies }: IMoviesList) => {

  return (
    <div className={cabinetStyles.movies}>
      {movies.map(x => <MovieListItem movie={x} key={`MoviesList-${x.id}`} />)}
    </div>
  )
}
