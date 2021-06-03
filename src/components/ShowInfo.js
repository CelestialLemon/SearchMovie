import React from 'react'
import { FaPlus } from 'react-icons/fa'   //icon for + sign in + Add to Watchlist button
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom' 
import '../bootstrap/bootstrap-5.0.1-dist/css/bootstrap.min.css'
import axios from 'axios'
import './layout/SeriesInfoPage/SeriesInfoPage.css'

import SeriesDetails from './layout/SeriesInfoPage/SeriesDetails'
import Genres from './layout/SeriesInfoPage/Genres'
import Description from './layout/SeriesInfoPage/Description'
import Title from './layout/SeriesInfoPage/Title'
import SeasonInfoCard from './layout/SeasonList/SeasonInfoCard'


const ShowInfo = () => {
    const { id } = useParams();      //tmdb id of the tv show to be displayed

    const [data, setData] = useState(null); //state used for data to be displayed on the page
   
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
    
    

    let bannerCss;   //css for banner , written external instead of inline to make code look cleaner     
    let SeasonCards = [];
    if(data)        //after data is fetched css is set to avoid error at data.backdrop
    {
       bannerCss = 
        {
            height : "720px",
            minHeight : "720px",
            padding: "25px 150px",
            boxShadow: "0px -16px 43px 21px rgba(0, 0, 0, 0.6)",
            backgroundSize : "cover",
            background: "linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(" 
            + data.backdrop + ") no-repeat center center fixed",
            boxShadow: "inset 0px 0px 0px 0px black"
        };

        for(var i=1; i<= data.numOfSeasons; i++)
        {
            SeasonCards.push(<SeasonInfoCard id={id} seasonNumber={i} key={i}></SeasonInfoCard>);
        }
    }


    
    

    useEffect(() =>
    {
        FetchData();
        
    }, [])     //avoid the cycle of fetching data every time the page is re-rendered
    
       
    if(data)//renderes page after data is fetched
    return (
        (<div style={{backgroundColor: "black"}}>
        <div className="header" style={bannerCss}>
            <img src={data.poster} height="70%" style={{marginTop: "50px"}} alt="a;df"></img>
            <div className="details" style={{marginLeft : "100px", marginTop:"50px"}}>
                <Title data={data}></Title>
                <Description data={data}></Description>
                <SeriesDetails data={data}></SeriesDetails>
                <br></br>
                <Genres data={data}></Genres>
                <div style={{display:"flex"}}>
                    <button className="button red">+ Currently Watching</button>
                    <button className="button goldenrod" >+ Watch Later</button>
                </div>
            </div>
        </div>
        <div>
            {SeasonCards}
        </div>
        </div>) 
    )
    else//rendered before data is fetched
    return (<h1>Loading</h1>)
}

export default ShowInfo
