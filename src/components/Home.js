import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useHistory} from 'react-router-dom'

import PopularShows from './layout/Home/PopularShows'
import Searchbar from './layout/Home/Searchbar/Searchbar'

import './layout/Home/Home.css'
import ValidateLocalToken from '../functions/ValidateLocalToken'
import ValidateSessionToken from '../functions/ValidateSessionToken'

import { AiOutlineSearch } from 'react-icons/ai'

const Home = () => {
    
    let history = useHistory();
    

    const bannerCss = 
        {
            height : "720px",
            minHeight : "720px",
            boxShadow: "0px -16px 43px 21px rgba(0, 0, 0, 0.6)",
            backgroundSize : "100%",
            background: "linear-gradient( rgba(0, 0, 0, 0)60%, rgba(0, 0, 0, 1)), url("+ "http://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg" + ") no-repeat center center fixed",
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

    const onClickMyLists = () =>
    {
        history.push("/mylists");
    }
       

    return (
        <div style={{backgroundColor : "black"}}>
            <div className="banner" style={bannerCss}>
                <button className="mylists" onClick={onClickMyLists}>My Lists</button>
                <div className="searchbar">
                <Searchbar></Searchbar>
                </div>
            </div>
            <PopularShows></PopularShows>
        </div>
    )
}

export default Home
