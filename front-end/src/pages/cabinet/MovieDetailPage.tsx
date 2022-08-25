import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { guid } from '../../app/dataTypes';
import { useAppSelector } from '../../app/hooks';
import { useGetMutation } from '../../redux/api/moviesApi';
import { selectToken } from '../../redux/slices/authSlice';
import { selectMovie } from '../../redux/slices/moviesSlice';
import {useTopBg} from "../../app/useBodyClass";
import {MovieDetailView} from "../../components/cabinet/MovieDetail";

export interface IMovieDetailPage {
}

export const MovieDetailPage = ({ }: IMovieDetailPage) => {
  useTopBg();
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
    <MovieDetailView name={movie.name} thumb={movie.thumbnail} description={movie.description} preview={movie.preview}  />
  )
}
