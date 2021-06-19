import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import analyze from 'rgbaster'

import { MdDone } from 'react-icons/md'

const SeasonInfoCard = ({ id, seasonNumber, totalNumOfSeasons, seasonsCompleted, onSeasonsCompletedChange}) => {
    
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

    const [markAsDoneCSS, setMarkAsDoneCSS] = useState(null);

    const onMarkAsDoneHover = () =>
    {
        setMarkAsDoneCSS({
            backgroundColor : foregroundColor,
            color : backgroundColor
        })
    }

    const onMarkAsDoneMouseExit = () =>
    {
        setMarkAsDoneCSS({
            backgroundColor : backgroundColor,
            color : foregroundColor
        })
    }

    const onClickMarkAsComplete = async () =>
    {
        try
        {
            const res = await axios.post('https://api-search-a-movie-22.herokuapp.com/shows/showstatus',
            {
                "showId" : id.toString()
            },
            {
                headers : {
                    'authorization' : "Bearer " + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))
                }
            });

            console.log({
                "listName" : res.data.listName,
                "showId" : id.toString(),
                "seasonsCompleted" : seasonNumber,
                "progress" : seasonNumber * 100 / totalNumOfSeasons
            })
            
            const res2 = await axios.post('https://api-search-a-movie-22.herokuapp.com/shows/updateprogress',
            {
                "listName" : res.data.listName,
                "showId" : id.toString(),
                "seasonsCompleted" : seasonNumber,
                "progress" : seasonNumber * 100 / totalNumOfSeasons
            },
            {
                headers : {
                    'authorization' : "Bearer " + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))
                }
            });

            seasonsCompleted = seasonNumber;
            console.log(res2.data);
            onSeasonsCompletedChange(seasonNumber, seasonNumber * 100 / totalNumOfSeasons);
        }catch(err)
        {
            console.log(err);
        }
    }

    useEffect(() =>
    {
        FetchSeasonsData();
    }, [id, seasonNumber])

    useEffect(() =>
    {
        setMarkAsDoneCSS({
            backgroundColor : backgroundColor,
            color : foregroundColor
        })
    }, [backgroundColor, foregroundColor])
    

    if(seasonData)
    {
        const arr = seasonData.air_date.split('-');
        const date = arr[2];
        const year = arr[0];
        const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
        const month = formatter.format(new Date(0, arr[1] - 1, 0));

        const airDate = date + " " + month + " " + year;
;
    return (
            <div className="season-card-container" style={{backgroundColor : backgroundColor, color : foregroundColor}}>
                <img className="poster" src={seasonData.poster}></img>
                <div className="details">
                    <div className="header">
                        <h3 className="title">{seasonData.seasonName}</h3>
                        { seasonNumber <= seasonsCompleted ?
                        
                        <button className="complete" onClick={onClickMarkAsComplete}
                        onMouseEnter={onMarkAsDoneHover} onMouseLeave={onMarkAsDoneMouseExit} disabled>
                          <MdDone className="icon"></MdDone>
                           Completed</button>:
                        
                        <button className="mark-as-complete" style={markAsDoneCSS} onClick={onClickMarkAsComplete}
                         onMouseEnter={onMarkAsDoneHover} onMouseLeave={onMarkAsDoneMouseExit}>
                            <MdDone className="icon"></MdDone>
                            Mark as Complete</button>}
                    </div>
                    <div >
                        <h3 className="overview">{seasonData.overview}</h3>
                    </div>
                    <div style={{display: "flex"}}>
                     <div style={{display: "flex"}}>
                    <div style={{backgroundColor : backgroundColor, color : foregroundColor}} className="numofepisodes">{airDate}</div>
                    <div style={{backgroundColor : backgroundColor, color : foregroundColor}} className="numofepisodes">{seasonData.numOfEpisodes + " Episodes"}</div>
                </div>
                   </div>
                </div>
            </div>
    )   
    }
    else
    return(
        <h2>loading</h2>
    )
}

export default SeasonInfoCard
