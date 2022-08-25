import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { goToAddMoviePage } from '../../app/navigations';
import { useTopBg } from '../../app/useBodyClass';
import { MoviesList } from '../../components/cabinet/MoviesList';
import { cls } from '../../helpers/misc';
import { useSignoutMutation } from '../../redux/api/authApi';
import { useMoviesMutation } from '../../redux/api/moviesApi';
import { selectToken, selectUserName } from '../../redux/slices/authSlice';
import cabinetStyles from '../../styles/cabinet.module.css';
import formStyles from '../../styles/form.module.css';

export interface ICabinetPage {
}

export const CabinetPage = ({ }: ICabinetPage) => {

  useTopBg();

  const navigation = useNavigate();
  const [signout, { }] = useSignoutMutation();
  const [loadMovies, { isLoading }] = useMoviesMutation();
  const userName = useAppSelector(selectUserName);
  const token = useAppSelector(selectToken);
  const movies = useAppSelector(state => state.movies);

  useEffect(() => {
    if (movies.status === 'idle') {
      loadMovies({ token });
    }
  }, []);

  const onLogoutClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    signout(token);
  }

  return (
    <section>
      <div className={cls(cabinetStyles.balloon, cabinetStyles.balloonFromLeft, 'cursor-pointer')}>
        Hello <strong>{userName}</strong> Your list of favorite movies.
        <br />
        Please choose action
        &nbsp;<button
          type="button"
          className={cls(formStyles.btn, formStyles.btnSuccess)}
          onClick={goToAddMoviePage(navigation)}
        >
          + Add movie
        </button>
        &nbsp;<button
          type="button"
          className={cls(formStyles.btn, formStyles.btnRed)}
          onClick={onLogoutClick}
        >
          Logout 🔒
        </button>
      </div>
      <div className={cabinetStyles.iconList}>
        <i className={cabinetStyles.iconMario} />
      </div>

      <MoviesList
        movies={movies.items}
        isInit={movies.status === 'idle'}
        isLoading={isLoading}
      />
    </section>
  )
}
