// src/pages/FavoritesPage.js
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { removeFromFavorites } from '../store/actions';
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);

  const handleRemoveFavorite = (movieId) => {
    dispatch(removeFromFavorites(movieId));
  };

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <div className="empty-favorites">
          <div className="empty-icon">❤️</div>
          <h2>Ваш список избранного пуст</h2>
          <p>Добавляйте фильмы в избранное, нажимая на сердечко ❤️</p>
          <Link to="/movies" className="browse-movies-btn">
            Перейти к фильмам
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>Мои избранные фильмы</h1>
        <p>Всего избранных фильмов: <span className="favorites-count">{favorites.length}</span></p>
      </div>

      <div className="favorites-grid">
        {favorites.map(movie => (
          <div key={movie.id} className="favorite-card">
            <Link to={`/movies/${movie.id}`} className="favorite-link">
              <div className="favorite-poster">
                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/300x450/333/fff?text=${encodeURIComponent(movie.title)}`;
                  }}
                />
              </div>
            </Link>
            
            <div className="favorite-info">
              <h3 className="favorite-title">
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </h3>
              <div className="favorite-meta">
                <span className="favorite-genre">{movie.genre}</span>
                <span className="favorite-duration">{movie.duration}</span>
                <span className="favorite-year">{movie.year}</span>
              </div>
              <p className="favorite-description">{movie.description}</p>
              
              <div className="favorite-actions">
                <Link to={`/movies/${movie.id}`} className="details-btn">
                  Подробнее
                </Link>
                <button 
                  className="remove-favorite-btn"
                  onClick={() => handleRemoveFavorite(movie.id)}
                >
                  ❌ Убрать из избранного
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="favorites-actions">
        <Link to="/movies" className="back-to-movies-btn">
          ← Назад ко всем фильмам
        </Link>
        <button 
          className="clear-favorites-btn"
          onClick={() => {
            if (window.confirm('Вы уверены, что хотите очистить все избранное?')) {
              favorites.forEach(movie => {
                dispatch(removeFromFavorites(movie.id));
              });
            }
          }}
        >
          🗑️ Очистить все избранное
        </button>
      </div>
    </div>
  );
};

export default FavoritesPage;