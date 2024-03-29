import React from 'react'
import { FaPlus } from 'react-icons/fa'   //icon for + sign in + Add to Watchlist button
import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom' 
import '../bootstrap/bootstrap-5.0.1-dist/css/bootstrap.min.css'
import axios from 'axios'

import Navbar from './layout/SeriesInfoPage/Navbar'
import Banner from './layout/SeriesInfoPage/Banner'

import SeasonTab from './layout/SeriesInfoPage/Tabs/SeasonTab/SeasonTab'
import CastTab from './layout/SeriesInfoPage/Tabs/CastTab/CastTab'
import ImagesTab from './layout/SeriesInfoPage/Tabs/ImagesTab/ImagesTab'
import RecommendedTab from './layout/SeriesInfoPage/Tabs/RecommendedTab/RecommendedTab'

import ValidateLocalToken from '../functions/ValidateLocalToken'
import ValidateSessionToken from '../functions/ValidateSessionToken'


const ShowInfo = () => {
    const { id } = useParams();      //tmdb id of the tv show to be displayed
    let history = useHistory();
    const [data, setData] = useState(null); //state used for data to be displayed on the page
    const [showStatus, setShowStatus] = useState('');
    const [showProgress, setShowProgress] = useState(0);
    const [showSeasonsCompleted, setShowSeasonsCompleted] = useState(0);
   

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
    const FetchData = async () =>
    {
        try
        {
            const res = await axios.get("https://api.themoviedb.org/3/tv/" + id, {params : {api_key : "06353fd3792f2599dd5cb140df26c423"}});  //fetching data from tmdb server
            
            
            //setting data from response recieveed
            setData({
                poster : "http://image.tmdb.org/t/p/original" + res.data.poster_path,     //images are located at http://image.tmdb.org/t/p/original + image id
                backdrop : "http://image.tmdb.org/t/p/original" + res.data.backdrop_path,
                title : res.data.name,
                description : res.data.overview,
                yearOfRelease : res.data.first_air_date.substring(0, 4),
                numOfSeasons : res.data.number_of_seasons,
                numOfEpisodes : res.data.number_of_episodes,
                genres : res.data.genres
            })
        }
        catch(err)
        {
            console.log(err);
        }
    }

    const FetchShowStatus = async () =>
    {
        try
        {
            const res = await axios.post('https://api-search-a-movie-22.herokuapp.com/shows/showstatus', 
            {
                "showId" : id.toString()},
            {headers : {'authorization' : 'Bearer ' + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))}}
            )

            console.log(res.data);
            setShowStatus(res.data.listName);
            setShowProgress(res.data.progress);
            setShowSeasonsCompleted(res.data.seasonsCompleted);
        }catch(err)
        {
            console.log(err);
        }
    }

    const onSeasonsCompletedChange = (seasonsCompleted, progress) => 
    {
        setShowSeasonsCompleted(seasonsCompleted);
        setShowProgress(progress);
    }

    const [activeTab, setActiveTab] = useState('SeasonsTab');

    const onTabChange = (tabName) =>
    {
        setActiveTab(tabName)
        console.log(activeTab);
    }

    useEffect(() =>
    {
        FetchData();
        FetchShowStatus();
        setActiveTab('SeasonsTab')
    }, [id])     //avoid the cycle of fetching data every time the page is re-rendered
   
       
    if(data)//renderes page after data is fetched
    return (
        (<div style={{backgroundColor: "black", paddingBottom:"50px"}}>
        <Banner data={data} id={id} showStatus={showStatus} showProgress={showProgress}></Banner>
        
        <div>
            <Navbar currentActiveTab={activeTab} onTabChange={onTabChange}></Navbar>
        </div>
        
        <div>
            {activeTab == "SeasonsTab" ? <SeasonTab id={id} data={data} seasonsCompleted={showSeasonsCompleted} onSeasonsCompletedChange={onSeasonsCompletedChange}></SeasonTab> : <></>}
            {activeTab == "CastTab" ? <CastTab id={id}></CastTab> : <></>}
            {activeTab == "ImagesTab" ? <ImagesTab id={id}></ImagesTab> : <></>}
            {activeTab == "RecommendedTab" ? <RecommendedTab id={id}></RecommendedTab> : <></>}
        </div>
        </div>) 
    )
    else//rendered before data is fetched
    return (<h1>Loading</h1>)
}

export default ShowInfo
