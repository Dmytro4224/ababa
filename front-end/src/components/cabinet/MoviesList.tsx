import React from 'react';
import {IMovie} from '../../app/dataTypes';
import { MovieListItem } from './MovieListItem';
import cabinetStyles from '../../styles/cabinet.module.css';
import {cls} from "../../helpers/misc";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import {selectToken, selectUserName} from "../../redux/slices/authSlice";
import { urls } from '../../app/navigations';
import {useDeleteMutation} from "../../redux/api/moviesApi";

interface IMoviesList {
  movies: IMovie[];
  isInit: boolean;
  isLoading: boolean;
}

export const MoviesList = ({ movies, isInit, isLoading }: IMoviesList) => {
  const userName = useAppSelector(selectUserName);
  const token = useAppSelector(selectToken);
  const [remove, { isLoading: isSubmitting, data }] = useDeleteMutation();

  if (isLoading || isInit) {
    return (
      <div className="mt-20">
        Loading movie...
      </div>
    )
  }

  const onRemoveMovie = (hash: string) => {
    remove({
        token: token,
        data: {
          movieHash: hash
        }
    })
  }

  if(!isInit && movies.length === 0){
    return <div className={cls(cabinetStyles.container, 'ta-c')}>
      <p className={cabinetStyles.containerTitle}>ℹ️ Info</p>
      <p>😿 {userName}, list is empty. Do you vant <Link to={urls.addMovie}>add new record</Link>?</p>
    </div>
  }

  return (
    <div className={cabinetStyles.movies}>
      {movies.map(x => <MovieListItem movie={x} key={`MoviesList-${x.hash}`} onRemoveMovie={onRemoveMovie} />)}
    </div>
  )
}
