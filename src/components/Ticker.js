import React from "react";

function Ticker(){
    return(
        <div style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            background: '#222',
            color : 'rgba(8, 23, 235, 1)',
            padding: '10px'
        }}>
            <marquee>Работаем каждый день без выходных</marquee>
        </div>
    )
}

export default Ticker;