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

  const outlet = useOutlet();

  useEffect(() => {
    if (isAuth === null) {
      const token = getToken();
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
    <>
      {outlet}
    </>
  )
}
