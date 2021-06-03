import React from 'react'
import { useState } from 'react'
import analyze from 'rgbaster'

const Temp = () => {

    const [res, setRes] = useState(null);
    const someFunction = async () => {
        const rest = await analyze('https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg', { scale : 0.2});
        setRes(rest[0].color);
        console.log(rest[0].color)
    }

    someFunction();

    if(res)
    return (
        <div>
          <div style={{minHeight : "100%", minWidth: "100%", backgroundColor : "#191F28"}}></div> 
        </div>
    )
    else
    return (
        <h2>Loading</h2>
    )
}

export default Temp
