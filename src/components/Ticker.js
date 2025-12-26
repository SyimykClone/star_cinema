import React from 'react';
import './Ticker.css';

const defaultItems = [
    'Работаем каждый день без выходных',
    'Скидки на премьеры по средам -10%',
    'Забронируйте места онлайн — быстро и удобно',
    'Новые фильмы в прокате: проверяйте расписание!'
];

export default function Ticker({ items = defaultItems }) {
    return (
        <div className="ticker" role="region" aria-label="Новости кинотеатра">
            <div className="ticker-track" aria-hidden="true">
                {items.map((it, i) => (
                    <div className="ticker-item" key={`a-${i}`}>
                        <span className="ticker-bullet">🎬</span>
                        <span className="ticker-text">{it}</span>
                    </div>
                ))}
            </div>

            <div className="ticker-track" aria-hidden="true">
                {items.map((it, i) => (
                    <div className="ticker-item" key={`b-${i}`}>
                        <span className="ticker-bullet">🎬</span>
                        <span className="ticker-text">{it}</span>
                    </div>
                ))}
            </div>

            <div className="ticker-controls">
                <button className="ticker-btn" onClick={() => { document.querySelector('.ticker')?.classList.toggle('muted'); }} aria-pressed="false">Пауза/Играть</button>
            </div>
        </div>
    );
}