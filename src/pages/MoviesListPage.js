// src/pages/MoviesListPage.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../store/actions';
import "./MoviesListPage.css";

const MoviesListPage = () => {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies.movies);
  const favorites = useSelector(state => state.favorites.favorites);
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Получаем уникальные жанры
  const genres = ["all", ...new Set(movies.flatMap(movie => 
    movie.genre.split(", ").map(g => g.trim())
  ))];

  // Фильтрация фильмов
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase()) ||
                         movie.description.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genreFilter === "all" || 
                        movie.genre.toLowerCase().includes(genreFilter.toLowerCase());
    return matchesSearch && matchesGenre;
  });

  // Проверяем, добавлен ли фильм в избранное
  const isFavorite = (movieId) => {
    return favorites.some(fav => fav.id === movieId);
  };

  // Обработчик добавления/удаления из избранного
  const handleFavoriteToggle = (movie, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite(movie.id)) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="movies-list-page">
      <div className="page-header">
        <h1>Все фильмы</h1>
        <p>Выберите фильм для просмотра детальной информации</p>
      </div>

      <div className="filters-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск фильмов..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <div className="genre-filter">
          <select 
            value={genreFilter} 
            onChange={(e) => setGenreFilter(e.target.value)}
            className="genre-select"
          >
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre === "all" ? "Все жанры" : genre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Загрузка фильмов...</p>
        </div>
      ) : (
        <>
          <div className="movies-count">
            Найдено фильмов: <span className="count-number">{filteredMovies.length}</span>
            <span className="favorites-info">
              В избранном: {favorites.length}
            </span>
          </div>
          
          <div className="movies-grid">
            {filteredMovies.length > 0 ? (
              filteredMovies.map(movie => (
                <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-card-link">
                  <div className="movie-card">
                    {movie.isFeatured && (
                      <div className="movie-badge">НОВИНКА</div>
                    )}
                    
                    <button 
                      className={`favorite-button ${isFavorite(movie.id) ? 'favorited' : ''}`}
                      onClick={(e) => handleFavoriteToggle(movie, e)}
                      title={isFavorite(movie.id) ? "Убрать из избранного" : "Добавить в избранное"}
                    >
                      {isFavorite(movie.id) ? '❤️' : '🤍'}
                    </button>
                    
                    <div className="movie-poster">
                      <img 
                        src={movie.poster} 
                        alt={movie.title}
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/300x450/333/fff?text=${encodeURIComponent(movie.title)}`;
                        }}
                      />
                      <div className="movie-overlay">
                        <span className="overlay-text">Подробнее →</span>
                      </div>
                    </div>
                    <div className="movie-info">
                      <h3 className="movie-title">{movie.title}</h3>
                      <div className="movie-meta">
                        <span className="movie-genre">{movie.genre}</span>
                        <span className="movie-duration">{movie.duration}</span>
                      </div>
                      <p className="movie-description">{movie.description}</p>
                      <div className="movie-footer">
                        <span className="movie-year">{movie.year}</span>
                        <div className="showtime-preview">
                          {movie.showtimes && movie.showtimes.slice(0, 2).map((time, i) => (
                            <span key={i} className="showtime-preview-item">{time}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="no-results">
                <h3>Фильмы не найдены</h3>
                <p>Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MoviesListPage;