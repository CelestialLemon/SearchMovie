import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

import './Episodes.css'

const Episodes = ({id, seasonNumber}) => {

    const [episodeData, setEpisodeData] = useState(null);

    const FetchEpisodeData = async () =>
    {
        try
        {
            const res = await axios.get("https://api.themoviedb.org/3/tv/" + id + "/season/" + seasonNumber, {params  : {api_key : "06353fd3792f2599dd5cb140df26c423"}});
            
            setEpisodeData(res.data.episodes);
            console.log(res.data.episodes);
        }
        catch(err)
        {

        }
    }

    const Episodes = [];
    if(episodeData)
    {
        episodeData.forEach((episode, index) => {
            if(episode.name.length > 32)
            episode.name = episode.name.substring(0, 32) + "...";

            Episodes.push(
            <div className="episodeContainer">
                <img className="poster" src={"https://image.tmdb.org/t/p/original" + episode.still_path} ></img>
                <h3 className="title">{(index + 1) + ". " + episode.name}</h3>
            </div>)
        });
    }

    useEffect(() =>
    {
        FetchEpisodeData();
    }, [seasonNumber])
    

    return (
        <div className="episodeGridContainer">
            {Episodes}
        </div>
    )
}

export default Episodes
