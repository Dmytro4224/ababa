import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom'
import { guid } from '../../app/dataTypes';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useGetMutation } from '../../redux/api/moviesApi';
import { selectToken } from '../../redux/slices/authSlice';
import { selectMovie } from '../../redux/slices/moviesSlice';

export interface IMovieDetailPage {
}

export const MovieDetailPage = ({ }: IMovieDetailPage) => {
  
  const params = useParams();
  const movieHash = params.movieHash as guid;

  const token = useAppSelector(selectToken);
  const movie = useAppSelector(selectMovie(movieHash));
  const [load, { isLoading }] = useGetMutation();

  useEffect(() => {
    load({ token, data: { movieHash } });
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
          {movie.description}
        </p>
        <p>
          {movie.thumbnail}
        </p>
        <p>
          {movie.preview}
        </p>
      </div>
    </div>
  )
}
