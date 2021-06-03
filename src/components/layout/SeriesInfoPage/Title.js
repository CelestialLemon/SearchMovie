import React from 'react'
import './SeriesInfoPage.css'

const Title = ({data}) => {
    return (
        <div>
          <h3 className="title">{data.title}</h3>
               
        </div>
    )
}

export default Title
