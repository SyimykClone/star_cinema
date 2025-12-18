import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store/authActions';
import "./ProfilePage.css";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const favoritesCount = useSelector(state => state.favorites.favorites.length);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>Мой профиль</h1>
          <p>Управление вашим аккаунтом</p>
        </div>
        
        <div className="profile-info">
          <div className="profile-avatar">
            {user?.name?.charAt(0) || 'U'}
          </div>
          
          <div className="profile-details">
            <h2>{user?.name || 'Пользователь'}</h2>
            <p className="profile-email">📧 {user?.email || 'Email не указан'}</p>
            <p className="profile-date">
              🗓️ Зарегистрирован: {user?.createdAt ? 
                new Date(user.createdAt).toLocaleDateString('ru-RU') : 
                'Дата не указана'}
            </p>
          </div>
        </div>
        
        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-icon">🎬</div>
            <div className="stat-content">
              <div className="stat-number">{favoritesCount}</div>
              <div className="stat-label">Избранных фильмов</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <div className="stat-number">0</div>
              <div className="stat-label">Оценок</div>
            </div>
          </div>
        </div>
        
        <div className="profile-actions">
          <Link to="/favorites" className="profile-btn favorites-btn">
            ❤️ Мои избранные фильмы
          </Link>
          
          <Link to="/movies" className="profile-btn browse-btn">
            🎬 Смотреть фильмы
          </Link>
          
          <button className="profile-btn logout-btn" onClick={handleLogout}>
            👋 Выйти из аккаунта
          </button>
        </div>
        
        <div className="profile-footer">
          <Link to="/" className="back-home-link">← На главную</Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;