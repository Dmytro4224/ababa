import { NavigateFunction } from 'react-router-dom';
import React from "react";

export const goToLoginPage = (navigation: NavigateFunction) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault();
  navigation('/login');
}

export const goToAddMoviePage = (navigation: NavigateFunction) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault();
  navigation('/u/add-movie');
}

export const goToRegister = (navigation: NavigateFunction) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault();
  navigation('/register');
}

export const goToMoviesList = (navigation: NavigateFunction) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault();
  navigation('/u');
}
