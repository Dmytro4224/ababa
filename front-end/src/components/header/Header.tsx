import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useSignoutMutation } from '../../redux/api/authApi';


export interface IHeader {
}

export const Header = ({ }: IHeader) => {
  const { isAuth, sessionToken, userToken } = useAppSelector(state => state.auth);

  const [signout, { }] = useSignoutMutation();

  const signOut = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    signout({ sessionToken, userToken });
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
