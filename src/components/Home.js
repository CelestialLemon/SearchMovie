import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useHistory} from 'react-router-dom'

import './layout/Home/Home.css'
import ValidateLocalToken from '../functions/ValidateLocalToken'
import ValidateSessionToken from '../functions/ValidateSessionToken'


const Home = () => {
    
    let history = useHistory();
    const bannerCss = 
        {
            height : "720px",
            minHeight : "720px",
            boxShadow: "0px -16px 43px 21px rgba(0, 0, 0, 0.6)",
            backgroundSize : "100%",
            background: "linear-gradient( rgba(0, 0, 0, 0)50%, rgba(0, 0, 0, 1)), url("+ "http://image.tmdb.org/t/p/original/kysKBF2CJG9qfQDSCDaboJrkZy1.jpg" + ") no-repeat center center fixed",
            boxShadow: "inset 0px 0px 0px 0px black"
        };

        const ValidateUser = async () =>
        {
            const res = await ValidateLocalToken();
            if(res === false)
            {
                const sessionRes = await ValidateSessionToken();
                if(sessionRes === false)
                {
                    history.push("/login");
                }

            }
        }

        ValidateUser();

    return (
        <div className="banner" style={bannerCss}>
        </div>
    )
}

export default Home
