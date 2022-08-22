import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import api from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { detail, findDetailMovie } from '../../redux/slices/moviesSlice';

export interface IMovieDetailPage {
}

export const MovieDetailPage = ({ }: IMovieDetailPage) => {
  
  const params = useParams();
  const movieId = Number(params.id);

  const movie = useAppSelector(findDetailMovie(movieId));
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (movie === null) {
      api.movies.detail({
        id: movieId
      }).then(response => {
        dispatch(detail(response));
        setIsLoading(false);
      });
    }
    else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div>
        Loading movie...
      </div>
    )
  }

  if (movie === null) {
    return (
      <div>
        not found
      </div>
    )
  }

  return (
    <div>
      <div>
        <h1>
          {movie.name}
        </h1>
        <p>
          {movie.title}
        </p>
        <p>
          {movie.description}
        </p>
      </div>
    </div>
  )
}