// src/pages/MoviesListPage.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites, bookSeat, fetchBookings } from '../store/actions';
import AuthPrompt from '../components/AuthPrompt';
import "./MoviesListPage.css";

const MoviesListPage = () => {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies.movies);
  const favorites = useSelector(state => state.favorites.favorites);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const bookings = useSelector(state => state.booking ? state.booking.bookings : []);
  const bookingError = useSelector(state => state.booking ? state.booking.error : null);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

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
    if (!isAuthenticated) {
      setShowAuthPrompt(true);
      return;
    }

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

  useEffect(() => {
    // fetch persisted bookings on mount
    dispatch(fetchBookings());
  }, [dispatch]);

  const [activeBookingMovieId, setActiveBookingMovieId] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState('');
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [lastAttemptBooking, setLastAttemptBooking] = useState(null);
  const [localMessage, setLocalMessage] = useState('');

  useEffect(() => {
    if (!lastAttemptBooking) return;
    const { movieId, seat, showtime } = lastAttemptBooking;
    const found = bookings.some(b => b.movieId === movieId && b.seat === seat && b.showtime === showtime);
    if (found) {
      setLocalMessage('Место успешно забронировано');
      // close panel after short delay
      setTimeout(() => {
        setActiveBookingMovieId(null);
        setSelectedSeat(null);
        setLastAttemptBooking(null);
        setLocalMessage('');
      }, 900);
    }
  }, [bookings, lastAttemptBooking]);

  useEffect(() => {
    if (bookingError) {
      setLocalMessage(bookingError);
      setTimeout(() => setLocalMessage(''), 2000);
    }
  }, [bookingError]);

  return (
    <div className="movies-list-page">
      <AuthPrompt open={showAuthPrompt} onClose={() => setShowAuthPrompt(false)} />
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
                      <div className={`movie-footer ${activeBookingMovieId === movie.id ? 'booking-open' : ''}`}>
                        <span className="movie-year">{movie.year}</span>
                        <div className="showtime-preview">
                          {movie.showtimes && movie.showtimes.slice(0, 2).map((time, i) => (
                            <span key={i} className="showtime-preview-item">{time}</span>
                          ))}
                        </div>
                        <div className="booking-actions">
                          {activeBookingMovieId === movie.id ? (
                            <div className="booking-panel" onClick={(e) => e.stopPropagation()}>
                              <label>
                                Сеанс:
                                <select value={selectedShowtime} onChange={(e) => setSelectedShowtime(e.target.value)}>
                                  {(movie.showtimes || []).map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                  ))}
                                </select>
                              </label>

                              <div className="seats-grid">
                                {['A','B','C','D'].map(row => (
                                  <div key={row} className="seat-row">
                                    {Array.from({length:6}, (_,i) => `${row}${i+1}`).map(seat => {
                                      const occupied = bookings.some(b => b.movieId === movie.id && b.showtime === selectedShowtime && b.seat === seat);
                                      const isSelected = selectedSeat === seat;
                                      return (
                                        <button
                                          key={seat}
                                          className={`seat ${occupied ? 'occupied' : ''} ${isSelected ? 'selected' : ''}`}
                                          disabled={occupied}
                                          onClick={(ev) => { ev.preventDefault(); ev.stopPropagation(); setSelectedSeat(seat); }}
                                        >{seat}</button>
                                      );
                                    })}
                                  </div>
                                ))}
                              </div>

                              <div className="booking-panel-actions">
                                <button
                                  className="confirm-book-button"
                                  disabled={!selectedSeat || !selectedShowtime}
                                    onClick={(ev) => {
                                    ev.preventDefault(); ev.stopPropagation();
                                    if (!selectedSeat || !selectedShowtime) { setLocalMessage('Выберите сеанс и место'); return; }
                                    const userId = isAuthenticated && user ? user.id : null;
                                    dispatch(bookSeat(movie.id, selectedSeat, userId, selectedShowtime));
                                    setLastAttemptBooking({ movieId: movie.id, seat: selectedSeat, showtime: selectedShowtime });
                                  }}
                                >Подтвердить</button>
                                <button className="cancel-book-button" onClick={(ev) => { ev.preventDefault(); ev.stopPropagation(); setActiveBookingMovieId(null); setSelectedSeat(null); setLocalMessage(''); }}>Отмена</button>
                              </div>

                              {localMessage && <div className="booking-message">{localMessage}</div>}
                            </div>
                          ) : (
                            <button
                              className="book-button"
                              onClick={(e) => {
                                e.preventDefault(); e.stopPropagation();
                                if (!isAuthenticated) { setShowAuthPrompt(true); return; }
                                setActiveBookingMovieId(movie.id);
                                setSelectedShowtime(movie.showtimes && movie.showtimes[0] ? movie.showtimes[0] : '');
                                setSelectedSeat(null);
                                setLocalMessage('');
                              }}
                              title="Забронировать"
                            >
                              Забронировать
                            </button>
                          )}
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
