import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { MoviesList } from '../../components/cabinet/MoviesList';
import { catalog } from '../../redux/slices/moviesSlice';

export interface IMoviesPage {
}

export const MoviesPage = ({ }: IMoviesPage) => {

  const movies = useAppSelector(state => state.movies.short);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
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
