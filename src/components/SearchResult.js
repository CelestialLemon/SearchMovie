import React from 'react'

const SearchResult = ({result}) => {

    let firstResult;
    if(result)
    {
        if(result.results)
        {
            firstResult = {
                "Title" : result.results[0].name,
                "First-Aired" : result.results[0].first_air_date,
                "Genre" : result.results[0].genre_ids,
                "Popularity" : result.results[0].popularity
            }
        }
        else
        {
            firstResult = {
                "Title" : "",
                "First-Aired" : "",
                "Genre" : "",
                "Popularity" : ""
            };
        }
        
    }
    else
    {
        firstResult = {
                "Title" : "",
                "First-Aired" : "",
                "Genre" : "",
                "Popularity" : ""
        };
    }

    return(
        <div >
            <h1>Title : {firstResult.Title}</h1>
            <h3>First Aired : {firstResult['First-Aired']}</h3>
            <h3>Genre : {firstResult.Genre.map(id => {return (<h3> {id}</h3>) } )}</h3>
            <h3>Popularity : {firstResult.Popularity}</h3>
        </div>
    )
}

export default SearchResult
