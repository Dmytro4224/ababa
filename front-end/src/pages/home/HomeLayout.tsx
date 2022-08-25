import React from 'react';
import { Navigate, useOutlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

interface IHomeLayout {
}

export const HomeLayout = ({ }: IHomeLayout) => {
  const { isAuth } = useAppSelector(state => state.auth);
  const outlet = useOutlet();

  if (isAuth) {
    return <Navigate to="/u" />
  }

  return (
    <div className="homeLayout">
      {outlet}
    </div>
  )
}
