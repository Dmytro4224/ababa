import { NavigateFunction } from 'react-router-dom';

export const goToLoginPage = (navigation: NavigateFunction) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault();
  navigation('/login');
}

export const goToAddMoviePage = (navigation: NavigateFunction) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault();
  navigation('/u/add-movie');
}
