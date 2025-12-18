import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MoviesListPage from "./pages/MoviesListPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesListPage />} />
            <Route path="/movies/:id" element={<MovieDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;