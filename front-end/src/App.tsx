import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CabinetLayout } from './pages/cabinet/CabinetLayout';
import { CabinetPage } from './pages/cabinet/CabinetPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { MovieDetailPage } from './pages/cabinet/MovieDetailPage';
import { HomeLayout } from './pages/home/HomeLayout';
import { CreateMoviePage } from './pages/cabinet/AddMoviePage';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="/u" element={<CabinetLayout />}>
          <Route path="" element={<CabinetPage />} />
          <Route path="movie/:movieHash" element={<MovieDetailPage />} />
          <Route path="add-movie" element={<CreateMoviePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
