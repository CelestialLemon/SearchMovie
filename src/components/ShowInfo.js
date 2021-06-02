import React from 'react'
import { FaPlus } from 'react-icons/fa'   //icon for + sign in + Add to Watchlist button
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom' 
import '../bootstrap/bootstrap-5.0.1-dist/css/bootstrap.min.css'
import axios from 'axios'
import '../App.css'

import ShowDetails from './layout/ShowInfoPage/ShowDetails'
import Genres from './layout/ShowInfoPage/Genres'


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
    useEffect(() =>
    {
        FetchData();
    }, [])     //avoid the cycle of fetching data every time the page is re-rendered
    

    let bannerCss;   //css for banner , written external instead of inline to make code look cleaner     
    
    if(data)        //after data is fetched css is set to avoid error at data.backdrop
    {
       bannerCss = 
    {
        height : "720px",
        padding: "25px 150px",
        boxShadow: "0px -16px 43px 21px rgba(0, 0, 0, 0.6)",
        backgroundSize : "cover",
        overflow: "hidden",
        background: "linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(" 
        + data.backdrop + ") no-repeat center center fixed",
        boxShadow: "inset 0px 0px 0px 0px black"
    };
    }
       
    if(data)//renderes page after data is fetched
    return (
        (<div>
        <div className="header" style={bannerCss}>
            <img src={data.poster} height="70%" style={{marginTop: "50px"}} alt="a;df"></img>
            <div className="details" style={{marginLeft : "100px", marginTop:"50px"}}>
             <h3 className="title">{data.title}</h3>
             <h3 className="description">{data.description}</h3>   
             <ShowDetails data={data}></ShowDetails>
             <br></br>
             <Genres data={data}></Genres>
             
             <button className="button red" style={{display:"flex"}}>+ My List</button>

            </div>
        </div>
        </div>) 
    )
    else//rendered before data is fetched
    return (<h1>Loading</h1>)
}

export default ShowInfo
