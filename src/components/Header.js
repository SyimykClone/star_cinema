import React  from "react";

function Header(){
    return(
        <header style={{padding: '15px', background: '#333', color: '#fff'}}>
            <nav>
                <a href="/" style={{margin:'10px', color: 'white'}}>Главная</a>
                <a href="/about" style={{margin:'10px', color: 'white'}}>О нас</a>
                <a href="/contacts" style={{margin:'10px', color: 'white'}}>Контакты</a>
                <a href="/movies" style={{margin:'10px', color: 'white'}}>Фильмы</a>
            </nav>
        </header>
    )
}
export default Header;