import React from 'react'
import { useHistory } from 'react-router-dom'

const SearchedShowComponent = ({data}) => {

    let history = useHistory();
    
    const onClickShow = () =>
    {
        history.push("/tv/" + data.id);
    }
    
    let year;
    if(data.first_air_date)
    {
        year = "(" + data.first_air_date.split('-')[0] + ")";
    }
    else
    {
        year = "";
    }
    return (
        
            <div className="searchedShowContainer" onClick={onClickShow}>
                        <img className="poster" src={"https://image.tmdb.org/t/p/original" + data.poster_path}></img>
                        <div className='details'>
                            <h3 className="title">{data.name}</h3>
                            <h3 className="year">{year}</h3>
                        </div>
                        <hr style={{height : "5px", color : "white"}}></hr>
                    </div>
    
    )
}

export default SearchedShowComponent
