import React, { useEffect } from 'react';
import { Link, Navigate, useLocation, useOutlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getToken } from '../../app/useAuth';
import { validateToken } from '../../redux/slices/authSlice';

export interface ICabinetPage {
}

export const CabinetLayout = ({}: ICabinetPage) => {
  const { isAuth } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const token = getToken();

  const outlet = useOutlet();

  useEffect(() => {
    console.log('CabinetLayout', isAuth);
    if (isAuth === null) {
      dispatch(validateToken(token));
    }
  }, []);

  if (isAuth === null) {
    return (
      <>
        <p>Checking authenticaton..</p>
      </>
    )
  }

  if (!isAuth) {
    return (
      <Navigate to="/login" state={{ from: location }} />
    )
  }

  return (
    <div>
      <nav>
        <Link to="">Cabinet</Link>
        <Link to="create">Create new</Link>
        <Link to="movies">Movies</Link>
        <Link to="movies/1">Detail</Link>
      </nav>
      {outlet}
    </div>
  )
}
