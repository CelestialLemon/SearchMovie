import React from 'react'
import { useState, useEffect } from 'react'
import analyze from 'rgbaster'
import axios from 'axios'

import './layout/SeriesInfoPage/Tabs/ImagesTab/ImagesTab.css'
const Temp = () => {

    

    const onSubmitClick = (e) =>
    {
        console.log("Submit was clicked");
    }

    

    return(
       <div>
           <h3>Username</h3>
           <input type="text" placeholder="Enter your username"></input>
           <h3>Password</h3>
           <input type="password" placeholder="Enter your password"></input>
           <button onClick={onSubmitClick} type="submit">Submit</button>
       </div>
   )
}

export default Temp
