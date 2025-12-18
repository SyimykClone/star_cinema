// src/pages/MovieDetailPage.js
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSpring, animated } from '@react-spring/web';
import moviesData from "../data/movies.json";
import "./MovieDetailPage.css";

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedMovies, setRelatedMovies] = useState([]);

  // Анимации
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 200,
  });

  useEffect(() => {
    setTimeout(() => {
      const foundMovie = moviesData.movies.find(m => m.id === parseInt(id));
      if (foundMovie) {
        setMovie(foundMovie);
        
        // Находим похожие фильмы по жанру
        const similar = moviesData.movies
          .filter(m => 
            m.id !== foundMovie.id && 
            m.genre.toLowerCase().includes(foundMovie.genre.split(",")[0].toLowerCase().trim())
          )
          .slice(0, 3);
        setRelatedMovies(similar);
      }
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Загрузка информации о фильме...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="not-found">
        <h2>Фильм не найден</h2>
        <p>Такого фильма нет в нашей базе данных.</p>
        <Link to="/movies" className="back-button">Вернуться к списку фильмов</Link>
      </div>
    );
  }

  return (
    <animated.div className="movie-detail-page" style={fadeIn}>
      <div className="movie-detail-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Назад к списку
        </button>
        
        <div className="movie-detail-content">
          <div className="movie-detail-poster">
            <img 
              src={movie.poster} 
              alt={movie.title}
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/400x600/333/fff?text=${encodeURIComponent(movie.title)}`;
              }}
            />
            {movie.isFeatured && (
              <div className="detail-badge">НОВИНКА</div>
            )}
          </div>
          
          <div className="movie-detail-info">
            <h1 className="detail-title">{movie.title} <span className="detail-year">({movie.year})</span></h1>
            
            <div className="detail-meta">
              <span className="detail-genre">{movie.genre}</span>
              <span className="detail-duration">⏱️ {movie.duration}</span>
            </div>
            
            <div className="detail-description">
              <h3>Описание</h3>
              <p>{movie.description}</p>
            </div>
            
            <div className="detail-showtimes">
              <h3>Сеансы на сегодня</h3>
              <div className="showtimes-grid">
                {movie.showtimes && movie.showtimes.map((time, index) => (
                  <div key={index} className="showtime-slot">
                    {time}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="detail-features">
              <h3>Информация о фильме</h3>
              <div className="features-grid">
                <div className="feature-item">
                  <span className="feature-label">Год выпуска</span>
                  <span className="feature-value">{movie.year}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-label">Длительность</span>
                  <span className="feature-value">{movie.duration}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-label">Жанр</span>
                  <span className="feature-value">{movie.genre}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-label">Статус</span>
                  <span className="feature-value">
                    {movie.isFeatured ? 'Новый в прокате' : 'В постоянном прокате'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {relatedMovies.length > 0 && (
          <div className="related-movies">
            <h3>Похожие фильмы</h3>
            <div className="related-grid">
              {relatedMovies.map(relatedMovie => (
                <Link to={`/movies/${relatedMovie.id}`} key={relatedMovie.id} className="related-card">
                  <img 
                    src={relatedMovie.poster} 
                    alt={relatedMovie.title}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/200x300/333/fff?text=${encodeURIComponent(relatedMovie.title)}`;
                    }}
                  />
                  <div className="related-info">
                    <h4>{relatedMovie.title}</h4>
                    <span className="related-genre">{relatedMovie.genre}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </animated.div>
  );
};

export default MovieDetailPage;