import React, { useState, useEffect } from "react";
import { useSpring, animated } from '@react-spring/web';
import Ticker from "../components/Ticker";
import Slider from "../components/Slider";
import moviesData from "../data/movies.json"; 
import "./HomePage.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  const titleAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 300,
  });

  const cardsAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 500,
  });

  useEffect(() => {
    console.log("Загружено фильмов:", moviesData.movies?.length); 
    
    setTimeout(() => {
      if (moviesData && moviesData.movies) {
        setMovies(moviesData.movies);
        setFeatures(moviesData.features || []);
      }
      
      setLoading(false);
    }, 1000);
  }, []);

  const featuredMovies = movies.filter(movie => movie.isFeatured);
  const regularMovies = movies.filter(movie => !movie.isFeatured);

  return (
    <div className="home-page">
      <Ticker />
      <Slider />
      
      <animated.section className="hero" style={titleAnimation}>
        <div className="hero-content">
          <h1>Лучшие фильмы в Star Cinema</h1>
          <p>Погрузитесь в мир кино с нашими премьерами</p>
        </div>
      </animated.section>

      {featuredMovies.length > 0 && (
        <animated.section className="featured-section" style={cardsAnimation}>
          <h2 className="section-title" style={{ color: "white" }}>Главные премьеры недели</h2>
          <p className="section-subtitle" style={{ color: "white" }}>Самые ожидаемые новинки в нашем кинотеатре</p>
          <div className="featured-grid">
            {featuredMovies.map((movie, index) => (
              <div 
                key={movie.id} 
                className="featured-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="featured-poster">
                  <img 
                    src={movie.poster} 
                    alt={movie.title}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/300x450/333/fff?text=${encodeURIComponent(movie.title)}`;
                    }}
                  />
                  <div className="featured-badge">
                    {movie.year === 2024 ? 'НОВАЯ ПРЕМЬЕРА' : 'ТОП ПРОКАТА'}
                  </div>
                </div>
                <div className="featured-content">
                  <h3>{movie.title} <span className="movie-year">({movie.year})</span></h3>
                  <div className="featured-meta">
                    <span className="featured-genre">{movie.genre}</span>
                    <span className="featured-duration">{movie.duration}</span>
                  </div>
                  <p className="featured-description">{movie.description}</p>
                  <div className="featured-showtimes">
                    <h4>Ближайшие сеансы:</h4>
                    <div className="featured-times">
                      {movie.showtimes && movie.showtimes.slice(0, 3).map((time, i) => (
                        <span key={i} className="featured-time">{time}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </animated.section>
      )}

      <animated.section className="movies-section" style={cardsAnimation}>
        <h2 className="section-title">Все фильмы в прокате</h2>
        <p className="section-subtitle">Полный список доступных фильмов в нашем кинотеатре</p>
        
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Загрузка фильмов...</p>
          </div>
        ) : (
          <>
            <div className="movies-stats">
              <div className="stat-item">
                <span className="stat-number">{movies.length}</span>
                <span className="stat-label">всего фильмов</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{featuredMovies.length}</span>
                <span className="stat-label">премьер этой недели</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{regularMovies.length}</span>
                <span className="stat-label">продолжают показ</span>
              </div>
            </div>
            
            <div className="movies-grid">
              {movies.length > 0 ? (
                movies.map((movie, index) => (
                  <div 
                    key={movie.id} 
                    className="movie-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {movie.isFeatured && (
                      <div className="movie-badge">НОВИНКА</div>
                    )}
                    <div className="movie-poster">
                      <img 
                        src={movie.poster} 
                        alt={movie.title}
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/300x450/333/fff?text=${encodeURIComponent(movie.title)}`;
                        }}
                      />
                    </div>
                    <div className="movie-info">
                      <h3 className="movie-title">
                        {movie.title} 
                        <span className="movie-year-small"> ({movie.year})</span>
                      </h3>
                      <div className="movie-meta">
                        <span className="movie-genre">{movie.genre}</span>
                        <span className="movie-duration">{movie.duration}</span>
                      </div>
                      <p className="movie-description">{movie.description}</p>
                      <div className="showtimes">
                        <h4>Сеансы сегодня:</h4>
                        <div className="showtime-list">
                          {movie.showtimes && movie.showtimes.map((time, i) => (
                            <span key={i} className="showtime-item">{time}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-movies">
                  <h3>Нет доступных фильмов</h3>
                  <p>Попробуйте зайти позже</p>
                </div>
              )}
            </div>
          </>
        )}
      </animated.section>

      <section className="features">
        <h2>Почему выбирают Star Cinema?</h2>
        <p className="section-subtitle">Лучший кинопоказ в городе с 2010 года</p>
        <div className="features-grid">
          {features.length > 0 ? (
            features.map((feature) => (
              <div key={feature.id} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))
          ) : (
            <>
              <div className="feature-card">
                <div className="feature-icon">🎬</div>
                <h3>Новейшее оборудование</h3>
                <p>4K проекция и Dolby Atmos</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🍿</div>
                <h3>Свежие закуски</h3>
                <p>Попкорн, напитки и многое другое</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💺</div>
                <h3>Удобные кресла</h3>
                <p>Кожаные кресла с подогревом</p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;