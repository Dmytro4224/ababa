import {useNavigate} from 'react-router-dom';
import {guid, IMovie} from '../../app/dataTypes';
import cabinetStyles from '../../styles/cabinet.module.css';
import formStyles from '../../styles/form.module.css';
import defaultImage from '../../img/default-image.png';
import {goToMovieDetail} from "../../app/navigations";
import {cls, isNullOrEmpty, setImage} from "../../helpers/misc";
import React from "react";

export interface IMovieListItem {
  movie: IMovie;
  onRemoveMovie: (hash: guid) => void;
}

export const MovieListItem = ({ movie, onRemoveMovie }: IMovieListItem) => {

  const handleRemoveMovie = (hash: guid, name: string) => {
    if(window.confirm(`You want to delete a movie ${name}`)){
      onRemoveMovie(hash);
    }
  }

  return (
    <div className={cabinetStyles.moviesItem}>
      {!isNullOrEmpty(movie.thumbnail) && <div>
        <img className={cabinetStyles.moviesItemImage} onError={(e) => { setImage(e, defaultImage) }} src={movie.thumbnail} alt=""/>
      </div>}
      <div>
        <h4 className={cabinetStyles.moviesItemName}>{movie.name}</h4>
        <p>
          {movie.description}
        </p>
        <div className={cabinetStyles.moviesItemButtons}>
          {/*<Link to={`/u/movie/${movie.hash}`}>Detail</Link>*/}
          <button type="button" onClick={goToMovieDetail(useNavigate(), movie.hash)} className={cls(formStyles.btn, formStyles.btnLink, formStyles.btnLinkViolet)}>👀&nbsp;View</button>
          &nbsp;|&nbsp;<button onClick={() => { handleRemoveMovie(movie.hash, movie.name) }} className={cls(formStyles.btn, formStyles.btnLink, formStyles.btnLinkRed)}>
          🗑️&nbsp;Remove
          </button>
        </div>
      </div>

    </div>
  )
}
