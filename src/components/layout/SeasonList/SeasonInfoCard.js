import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import analyze from 'rgbaster'

import './SeasonList.css'


const SeasonInfoCard = ({ id, seasonNumber }) => {
    //const { id, seasonNumber } = useParams();

    const [seasonData, setSeasonData] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState(null);
    const [foregroundColor, setForegroundColor] = useState(null);

    const setColors = async () =>
    {
        const res = await analyze(seasonData.poster, {scale : 0.1});    //rgbaster take sthe image as input and outputs the most prominent color of the image in string format 
        //res[0].color = res[0].color.replace(")", ", 0.7)");           //return an array of colors so res[0] contains the most prominent color
        
        setBackgroundColor(res[0].color);
        
        const backgroundColorInRGBArray = res[0].color.replace("rgb(", "").replace(")", "").split(",");
        
        const InvertRGBColor = (r, g, b) =>
        {
            return [255 - r, 255 - g, 255 - b];
        }

        const InvertedColor = InvertRGBColor(backgroundColorInRGBArray[0], backgroundColorInRGBArray[1], backgroundColorInRGBArray[2]);
        if(InvertedColor[2] > 200 && InvertedColor[0] < 80 && InvertedColor[1] < 80) InvertedColor[2] -= 100;
        setForegroundColor("rgb(" + InvertedColor + ")");
        
    }

    const FetchSeasonsData = async () =>
    {
        try
        {//1399/season/3/images?api_key=06353fd3792f2599dd5cb140df26c423
            const res = await axios.get("https://api.themoviedb.org/3/tv/" + id + "/season/" + seasonNumber, 
            {params : {api_key : "06353fd3792f2599dd5cb140df26c423"}});

           

            setSeasonData({
                "seasonName" : res.data.name,
                "overview" : res.data.overview.length > 350 ? res.data.overview.substring(0, 300) + "..." : res.data.overview,
                "poster" : "http://image.tmdb.org/t/p/original" + res.data.poster_path,
                "air_date" : res.data.air_date,
                "numOfEpisodes" : res.data.episodes.length
            });


            
        }catch(err)
        {
            console.log(err);
        }
    }

    if(seasonData){
        setColors();
    }
    

    useEffect(() =>
    {
        FetchSeasonsData();
    }, [])

    

    if(seasonData)
    return (
            <div>
            <div className="seasonContainer" style={{backgroundColor : backgroundColor, color : foregroundColor}}>
            <img className="poster" src={seasonData.poster}></img>
            <div className="details">
                <h3 className="title">{seasonData.seasonName}</h3>
                <br></br>
                <h3 className="overview">{seasonData.overview}</h3>
                
                <div style={{display: "flex"}}>
                    <h3 className="numofepisodes">{seasonData.air_date}</h3>
                    <h3 className="numofepisodes">|</h3>
                    <h3 className="numofepisodes">{seasonData.numOfEpisodes + " Episodes"}</h3>
                </div>
            </div>
            
        </div>
        </div>
        
    )
    else
    return(
        <h2>loading</h2>
    )
}

export default SeasonInfoCard
