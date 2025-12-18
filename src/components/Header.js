// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import "./Header.css";

function Header() {
  const favoritesCount = useSelector(state => state.favorites.favorites.length);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Star Cinema
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Главная</Link>
          <Link to="/movies" className="nav-link">Все фильмы</Link>
          <Link to="/favorites" className="nav-link favorites-link">
            Избранное
            {favoritesCount > 0 && (
              <span className="favorites-count">{favoritesCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;