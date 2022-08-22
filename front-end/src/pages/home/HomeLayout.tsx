import React from 'react';
import { Link, Navigate, useOutlet } from 'react-router-dom';
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
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
      {outlet}
    </div>
  )
}
