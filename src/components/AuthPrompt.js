import React from 'react';
import { Link } from 'react-router-dom';
import './AuthPrompt.css';

const AuthPrompt = ({ open, onClose, message }) => {
  if (!open) return null;

  return (
    <div className="auth-prompt-overlay" onClick={onClose}>
      <div className="auth-prompt" onClick={(e) => e.stopPropagation()}>
        <h3>{message || 'Требуется вход'}</h3>
        <p>Пожалуйста, войдите или зарегистрируйтесь, чтобы продолжить.</p>
        <div className="auth-prompt-actions">
          <Link to="/login" className="auth-btn" onClick={onClose}>Войти</Link>
          <Link to="/register" className="auth-btn outline" onClick={onClose}>Регистрация</Link>
        </div>
        <button className="auth-close" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default AuthPrompt;
