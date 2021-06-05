import React from 'react'
import SeasonInfoCard from './SeasonInfoCard'
import SeasonSelect from './SeasonSelect'
import EpisodesGrid from './Episodes/EpisodesGrid'
import { useState, useEffect } from 'react'

import './SeasonTab.css'

const SeasonTab = ({ id, data }) => {

    const [currentSeason, setCurrentSeason] = useState('All Seasons');
    
    const onSeasonChange = (seasonName) =>
    {
        setCurrentSeason(seasonName);
       // console.log(seasonName);
    }


    let someRandomVariable;

    console.log(currentSeason);

    if(currentSeason == "All Seasons")
    {
        someRandomVariable=[];
        let tempVar;
        for(var i=1; i<=data.numOfSeasons; i++)
        {
            tempVar = (<SeasonInfoCard id={id} seasonNumber={i}></SeasonInfoCard>)
            someRandomVariable.push(tempVar);
        }
    }
    else
    {
        someRandomVariable = (<SeasonInfoCard id={id} seasonNumber={currentSeason.split(" ")[1]}></SeasonInfoCard>)
    }
    

    
    
    // console.log(SeasonCards)

   
    
    return (
        <div>
            <SeasonSelect data={data} onSeasonChange={onSeasonChange}></SeasonSelect>
            {someRandomVariable}
            {currentSeason == "All Seasons" ? <></> : <EpisodesGrid id={id} seasonNumber={currentSeason.split(" ")[1]}></EpisodesGrid>}
        </div>
    )
   
}

export default SeasonTab
