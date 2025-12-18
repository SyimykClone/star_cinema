import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Star Cinema
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Главная</Link>
          <Link to="/movies" className="nav-link">Все фильмы</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;