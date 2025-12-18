import React, { useState, useEffect } from "react";
import moviesData from "../data/movies.json";
import "./Slider.css";

function Slider() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [featuredMovies, setFeaturedMovies] = useState([]);

  useEffect(() => {
    // Получаем фильмы для слайдера (только те, у которых isFeatured: true)
    const featured = moviesData.movies.filter(movie => movie.isFeatured);
    setFeaturedMovies(featured);
  }, []);

  const next = () => {
    setFade(false);
    setTimeout(() => {
      setIndex(prev => (prev + 1) % featuredMovies.length);
      setFade(true);
    }, 300);
  };

  const prev = () => {
    setFade(false);
    setTimeout(() => {
      setIndex(prev => (prev - 1 + featuredMovies.length) % featuredMovies.length);
      setFade(true);
    }, 300);
  };

  // Автоматическое переключение слайдов
  useEffect(() => {
    if (featuredMovies.length > 0) {
      const interval = setInterval(() => {
        next();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featuredMovies, index]);

  if (featuredMovies.length === 0) return null;

  const currentMovie = featuredMovies[index];

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        <div 
          className={`slider-image ${fade ? 'fade-in' : 'fade-out'}`}
          style={{
            backgroundImage: `url(${currentMovie.poster})`
          }}
        >
          <div className="slider-overlay">
            <div className="slider-content">
              <h2 className="slider-title">{currentMovie.title}</h2>
              <p className="slider-description">{currentMovie.description}</p>
              <div className="slider-info">
                <span className="slider-genre">{currentMovie.genre}</span>
                <span className="slider-duration">{currentMovie.duration}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="slider-nav">
          <button className="nav-button prev" onClick={prev}>
            ‹
          </button>
          <button className="nav-button next" onClick={next}>
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

export default Slider;