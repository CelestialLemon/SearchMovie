import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import analyze from 'rgbaster'




const SeasonInfoCard = ({ id, seasonNumber }) => {
    
    const [seasonData, setSeasonData] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState(null);
    const [foregroundColor, setForegroundColor] = useState(null);

    const setColors = async () =>
    {
        const res = await analyze(seasonData.poster, {scale : 0.1});    //rgbaster take sthe image as input and outputs the most prominent color of the image in string format 
        
        setBackgroundColor(res[0].color);
        
        const backgroundColorInRGBArray = res[0].color.replace("rgb(", "").replace(")", "").split(",");
        
        const InvertRGBColor = (r, g, b) =>
        {
            return [255 - r, 255 - g, 255 - b];
        }

        const InvertedColor = InvertRGBColor(backgroundColorInRGBArray[0], backgroundColorInRGBArray[1], backgroundColorInRGBArray[2]);
        if(InvertedColor[0] > 200 && (InvertedColor[1] < 50 || InvertedColor[2] < 50)) { InvertedColor[0] -= 80;  }       //if any 1 primary color is dominant it makes harder to read so reduce the dominanat color
        else if(InvertedColor[1] > 200 && (InvertedColor[0] < 50 || InvertedColor[2] < 50)) { InvertedColor[1] -= 80;  }
        else if(InvertedColor[2] > 200 && (InvertedColor[0] < 50 || InvertedColor[1] < 50)) { InvertedColor[2] -= 80;  }
        
        InvertedColor[0] += 30;     //make the foreground color a bit brighter so easier to read
        InvertedColor[1] += 30;
        InvertedColor[2] += 30;

        if(InvertedColor[0] > 255) InvertedColor[0] = 255;   //make sure the value is still valid
        if(InvertedColor[1] > 255) InvertedColor[1] = 255;
        if(InvertedColor[2] > 255) InvertedColor[2] = 255;
        setForegroundColor("rgb(" + InvertedColor + ")");
    }

    const FetchSeasonsData = async () =>
    {
        try
        {//1399/season/3/images?api_key=06353fd3792f2599dd5cb140df26c423
            const res = await axios.get("https://api.themoviedb.org/3/tv/" + id + "/season/" + seasonNumber, 
            {params : {api_key : "06353fd3792f2599dd5cb140df26c423"}});

           if(!res.data.overview || res.data.overview == "")
           {
               res.data.overview = "--No Data--"
           }

            setSeasonData({
                "seasonName" : res.data.name,
                "overview" : res.data.overview.length > 350 ? res.data.overview.substring(0, 350) + "..." : res.data.overview,
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
    }, [id, seasonNumber])


 
    

    if(seasonData)
    return (
            <div>
            <div className="seasonContainer" style={{backgroundColor : backgroundColor, color : foregroundColor}}>
            <img className="poster" src={seasonData.poster}></img>
            <div className="details">
                <h3 className="title">{seasonData.seasonName}</h3>
                <br></br>
                <h3 className="overview" style={{backgroundColor : backgroundColor, color : foregroundColor}}>{seasonData.overview}</h3>
                
                <div style={{display: "flex"}}>
                    <button style={{backgroundColor : backgroundColor, color : foregroundColor}} className="numofepisodes btn btn-outline-secondary">{seasonData.air_date}</button>
                    <button style={{backgroundColor : backgroundColor, color : foregroundColor}} className="numofepisodes btn btn-outline-secondary">{seasonData.numOfEpisodes + " Episodes"}</button>
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
