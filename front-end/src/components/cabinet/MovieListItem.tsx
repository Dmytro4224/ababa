import { Link } from 'react-router-dom';
import { IMovie } from '../../api/moviesApi';

export interface IMovieListItem {
  movie: IMovie;
}

export const MovieListItem = ({ movie }: IMovieListItem) => {

  return (
    <div>
      <h2>
        {movie.name}
      </h2>
      <p>
        {movie.title}
      </p>
      <div>
        <Link to={`/u/movies/${movie.id}`}>Detail</Link>
      </div>
    </div>
  )
}
