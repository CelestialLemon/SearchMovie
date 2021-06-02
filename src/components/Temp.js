import React from 'react'
import { useState } from 'react'
import TempCounter from './TempCounter'

const Temp = () => {

    const [counter, setCounter] = useState(0);
   
    const onIncreaseClick = () => {
        setCounter(counter + 1);
    }

    return (
        <div>
            <h2>This is temporary route</h2>
            <TempCounter counter={counter}></TempCounter>
            <button onClick={onIncreaseClick}>Increase</button>
        </div>
    )
}

export default Temp
