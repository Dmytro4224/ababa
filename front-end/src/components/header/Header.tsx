import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { signout } from '../../redux/slices/authSlice';

export interface IHeader {
}

export const Header = ({ }: IHeader) => {
  const { isAuth } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const signOut = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(signout());
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/u">Cabinet</Link>
          </li>
          {isAuth && (
            <li>
              <a
                href="#"
                onClick={signOut}
              >
                Sign out
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
