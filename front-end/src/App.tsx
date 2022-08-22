import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CabinetLayout } from './pages/cabinet/CabinetLayout';
import { CabinetPage } from './pages/cabinet/CabinetPage';
import { LoginPage } from './pages/auth/LoginPage';
import { HomePage } from './pages/home/HomePage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { MoviesPage } from './pages/cabinet/MoviesPage';
import { MovieDetailPage } from './pages/cabinet/MovieDetailPage';
import { HomeLayout } from './pages/home/HomeLayout';
import { Header } from './components/header/Header';
import { CreateMoviePage } from './pages/cabinet/AddMoviePage';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="/u" element={<CabinetLayout />}>
          <Route path="" element={<CabinetPage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="movies/:id" element={<MovieDetailPage />} />
          <Route path="create" element={<CreateMoviePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
