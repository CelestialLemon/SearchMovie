import React from 'react'
import '../../../App.css'

const Genres = ({data}) => {
    return (
        <div>
            <div style={{display: "flex"}}>
             {data.genres.map((genre, index) =>
             {

                 return(
                     <div>
                         <h3 className="genre btn btn-outline-secondary" style={{borderRadius: "50px"}} key={index}>{genre.name}</h3>
                     </div>
                 )
             })}
            </div> 
        </div>
    )
}

export default Genres
