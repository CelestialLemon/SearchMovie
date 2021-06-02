import React from 'react'
import '../../../App.css'

const ShowDetails = ({data}) => {
    return (
        <div>
             <h3 className="year">{data.yearOfRelease}</h3>
             <h3 className="bar">|</h3>

             <h3 className="seasons">{data.numOfSeasons} Seasons</h3>
             <h3 className="bar">|</h3>

             <h3 className="seasons">{data.numOfEpisodes} Episodes</h3> 
        </div>
    )
}

export default ShowDetails
