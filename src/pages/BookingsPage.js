// src/pages/BookingsPage.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { cancelBookingAsync, fetchBookings, removeBookingAsync } from '../store/actions';
import { useState } from 'react';
import './BookingsPage.css';

const BookingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const bookings = useSelector(state => state.booking ? state.booking.bookings : []);
  const [searchName, setSearchName] = useState('');
  const [sortKey, setSortKey] = useState('date');

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

  // Filter by search name
  const filtered = userBookings.filter(b => {
    if (!searchName) return true;
    return (b.customerName || '').toLowerCase().includes(searchName.toLowerCase());
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortKey === 'date') {
      const da = a.date ? new Date(a.date) : new Date(a.createdAt);
      const db = b.date ? new Date(b.date) : new Date(b.createdAt);
      return da - db;
    }
    if (sortKey === 'guests') {
      return (a.guests || 0) - (b.guests || 0);
    }
    // name
    return (a.customerName || '').localeCompare(b.customerName || '');
  });

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

      <div className="bookings-controls">
        <input placeholder="Найти по имени" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
          <option value="date">Сортировать по дате</option>
          <option value="guests">Сортировать по количеству гостей</option>
          <option value="name">Сортировать по имени</option>
        </select>
      </div>

      <div className="bookings-list">
        {sorted.map(b => (
          <div key={b.id} className="booking-card">
            <div className="booking-info">
              <div><strong>Фильм:</strong> <Link to={`/movies/${b.movieId}`}>Перейти</Link></div>
              <div><strong>Сеанс:</strong> {b.showtime || '—'}</div>
              <div><strong>Место:</strong> {b.seat}</div>
              <div><strong>Дата события:</strong> {b.date || '—'}</div>
              <div><strong>Имя:</strong> {b.customerName || '—'}</div>
              <div><strong>Телефон:</strong> {b.phone || '—'}</div>
              <div><strong>Гостей:</strong> {b.guests || '—'}</div>
              <div><strong>Дата брони:</strong> {new Date(b.createdAt).toLocaleString()}</div>
            </div>
            <div className="booking-actions">
              <button className="cancel-booking" onClick={() => dispatch(removeBookingAsync(b.id))}>Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
