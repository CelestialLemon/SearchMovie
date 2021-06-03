import React from 'react'
import './SeriesInfoPage.css'

const Description = ({data}) => {
    return (
        <div>
            <h3 className="description">{data.description}</h3>   
             
        </div>
    )
}

export default Description
