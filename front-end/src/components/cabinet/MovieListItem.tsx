import { Link } from 'react-router-dom';
import { IMovie } from '../../app/dataTypes';
import cabinetStyles from '../../styles/cabinet.module.css';
import formStyles from '../../styles/form.module.css';

export interface IMovieListItem {
  movie: IMovie;
}

export const MovieListItem = ({ movie }: IMovieListItem) => {

  return (
    <div className={cabinetStyles.moviesItem}>
      <h2>
        {movie.name}
      </h2>
      <p>
        {movie.description}
      </p>
      <div>
        <Link to={`/u/movie/${movie.hash}`}>Detail</Link>
      </div>
    </div>
  )
}
