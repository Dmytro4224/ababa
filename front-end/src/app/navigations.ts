import { NavigateFunction } from 'react-router-dom';
import React from "react";
import {guid} from "./dataTypes";

export const goToLoginPage = (navigation: NavigateFunction) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault();
  navigation(urls.login);
}

export const goToAddMoviePage = (navigation: NavigateFunction) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault();
  navigation(urls.addMovie);
}

export const goToRegister = (navigation: NavigateFunction) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault();
  navigation(urls.register);
}

export const goToMoviesList = (navigation: NavigateFunction) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault();
  navigation(urls.cabinet);
}

export const goToMovieDetail = (navigation: NavigateFunction, hash: guid) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault();
  navigation(urls.detail(hash));
}

export const urls = {
  cabinet: '/u',
  register: '/register',
  addMovie: '/u/add-movie',
  login: '/',
  detail: (hash: guid) => `/u/movie/${hash}`
}
