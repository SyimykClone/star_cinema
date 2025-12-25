import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authActions';
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoritesCount = useSelector(state => state.favorites.favorites.length);
  const { user, isAuthenticated } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const getCounterClass = () => {
    if (favoritesCount > 99) return "favorites-count triple-digit";
    if (favoritesCount > 9) return "favorites-count double-digit";
    return "favorites-count";
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Star Cinema
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Главная</Link>
          <Link to="/movies" className="nav-link">Все фильмы</Link>
          
          {isAuthenticated && (
            <>
              <Link to="/bookings" className="nav-link">Мои бронирования</Link>
              <Link to="/favorites" className="nav-link favorites-link">
                Избранное
                {favoritesCount > 0 && (
                  <span className={getCounterClass()}>
                    {favoritesCount > 99 ? '99+' : favoritesCount}
                  </span>
                )}
              </Link>
            </>
          )}
          
          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-greeting">
                Привет, {user?.name?.split(' ')[0] || 'Пользователь'}
              </span>
              <button className="logout-btn" onClick={handleLogout}>
                Выйти
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-link">Войти</Link>
              <Link to="/register" className="nav-link register-btn">Регистрация</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;