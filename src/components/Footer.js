import React from "react";
import './Footer.css';

function Footer(){
    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <div className="footer-brand">
                    <h3>Star Cinema</h3>
                    <p className="muted">Лучшие фильмы и удобные бронирования</p>
                </div>

                <div className="footer-links">
                    <div className="links-column">
                        <h4>Ссылки</h4>
                        <a href="/movies">Все фильмы</a>
                        <a href="/bookings">Мои бронирования</a>
                        <a href="/favorites">Избранное</a>
                    </div>
                    <div className="links-column">
                        <h4>Контакты</h4>
                        <div className="contact-line">📞 0999999999</div>
                        <div className="contact-line">✉️ support@starcinema.example</div>
                        <div className="contact-line">📍 Токмок, ул. Кино 10</div>
                    </div>
                </div>

                <div className="footer-social">
                    <div className="social-row">
                        <a href="#">Instagram</a>
                        <a href="#">Facebook</a>
                        <a href="#">Telegram</a>
                    </div>
                    <div className="copyright">© {new Date().getFullYear()} Star Cinema. Все права защищены.</div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;