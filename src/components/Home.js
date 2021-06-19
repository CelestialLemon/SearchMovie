import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory} from 'react-router-dom'

import PopularShows from './layout/Home/PopularShows'
import Searchbar from './layout/Home/Searchbar/Searchbar'

import './layout/Home/Home.css'
import ValidateLocalToken from '../functions/ValidateLocalToken'
import ValidateSessionToken from '../functions/ValidateSessionToken'

import { AiOutlineSearch } from 'react-icons/ai'

const Home = () => {
    
    let history = useHistory();     //set image url to a black image by default which is displayed till the actual image is loaded
    const [imageUrl, setImageUrl] = useState('https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fphotos%2FRO3-oMM3s8A&psig=AOvVaw2NH2E2DoGbg8YL2LctXC8x&ust=1624087173092000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCPCoiqrSoPECFQAAAAAdAAAAABAN');
    const [bannerShowInfo, setBannerShowInfo] = useState(null);
    const [header, setHeader] = useState('');

    const bannerCss = 
        {
            height : "720px",
            minHeight : "720px",
            boxShadow: "0px -16px 43px 21px rgba(0, 0, 0, 0.6)",
            backgroundSize : "100%",
            background: "linear-gradient( rgba(0, 0, 0, 0)60%, rgba(0, 0, 0, 1)), url("+ imageUrl + ") no-repeat center center fixed",
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

    const LoadImage = async () =>
    {
        try
        {
            const res = await axios.get('http://localhost:4000/lists/getcurrentlywatchingshows',
            {
                headers : {
                    'authorization' : "Bearer " + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))
                }
            });
           
            if(res.data.length > 0)
            {
                const min = Math.ceil(0);
                const max = Math.floor(res.data.length);
                const randomPosterIndex = Math.floor(Math.random() * (max - min) + min)
                
                const showInfo = await axios.get('https://api.themoviedb.org/3/tv/' + res.data[randomPosterIndex].showId, {params : {api_key : "06353fd3792f2599dd5cb140df26c423"}})
                setImageUrl('https://image.tmdb.org/t/p/original' + showInfo.data.backdrop_path);
                setBannerShowInfo(showInfo.data);
                setHeader('Currently Watching');
            }
            else
            {
                const min = Math.ceil(6);
                const max = Math.floor(20);
                const randomPosterIndex = Math.floor(Math.random() * (max - min) + min)
                
                const showInfo = await axios.get('https://api.themoviedb.org/3/tv/popular', {params : {api_key : "06353fd3792f2599dd5cb140df26c423"}})
                setImageUrl('https://image.tmdb.org/t/p/original' + showInfo.data.results[randomPosterIndex].backdrop_path);
                setBannerShowInfo(showInfo.data.results[randomPosterIndex]);
                setHeader('Now Trending');
            }
        }catch(err)
        {
            console.log(err);
        }
    }


    useEffect(() =>
    {
        LoadImage()
    }, [])
       

    if(bannerShowInfo)
    return (
        <div style={{backgroundColor : "black"}}>
            <div className="banner" style={bannerCss}>
                <div className="taskBar" >
                    <button className="mylists" onClick={onClickMyLists}>My Lists</button>
                    <div className="searchbar">
                    <Searchbar></Searchbar>
                    </div>
                </div>
                <div className="showInfo" style={{zIndex : "10"}}>
                    <h3 className="currently-watching">{header}</h3>
                    <h3 className="title">{bannerShowInfo.name}</h3>
                </div>
            </div>
            <PopularShows></PopularShows>
        </div>
    )
    else
    return (<h3>Loading</h3>)
}

export default Home
