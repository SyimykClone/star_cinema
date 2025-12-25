// src/pages/BookingsPage.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { cancelBookingAsync, fetchBookings } from '../store/actions';
import './BookingsPage.css';

const BookingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const bookings = useSelector(state => state.booking ? state.booking.bookings : []);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  if (!isAuthenticated) {
    return (
      <div className="bookings-page empty">
        <h2>Требуется вход</h2>
        <p>Чтобы просматривать свои бронирования, пожалуйста, <Link to="/login">войдите</Link> в аккаунт.</p>
      </div>
    );
  }

  const userBookings = bookings.filter(b => b.userId && user && b.userId === user.id);

  if (userBookings.length === 0) {
    return (
      <div className="bookings-page empty">
        <h2>У вас пока нет бронирований</h2>
        <p>Перейдите на <Link to="/movies">страницу фильмов</Link>, чтобы забронировать места.</p>
      </div>
    );
  }

  return (
    <div className="bookings-page">
      <div className="bookings-header">
        <h1>Мои бронирования</h1>
        <p>Всего: {userBookings.length}</p>
      </div>

      <div className="bookings-list">
        {userBookings.map(b => (
          <div key={b.id} className="booking-card">
            <div className="booking-info">
              <div><strong>Фильм:</strong> <Link to={`/movies/${b.movieId}`}>Перейти</Link></div>
              <div><strong>Сеанс:</strong> {b.showtime || '—'}</div>
              <div><strong>Место:</strong> {b.seat}</div>
              <div><strong>Дата брони:</strong> {new Date(b.createdAt).toLocaleString()}</div>
            </div>
            <div className="booking-actions">
              <button className="cancel-booking" onClick={() => dispatch(cancelBookingAsync(b.id))}>Отменить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
