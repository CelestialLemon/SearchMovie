import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router';

const PopularShows = () => {

    let history = useHistory();
    const [popularShowsData, setPopularShowsData] = useState(null);

    const FetchPopularShows = async () =>
    {
        try
        {
            const res = await axios.get("https://api.themoviedb.org/3/tv/popular", {params : {"api_key" : "06353fd3792f2599dd5cb140df26c423"}});
            console.log(res.data);
            setPopularShowsData(res.data);
        }catch(err)
        {
            console.log(err);
        }
    }

    const onShowClick = (idOfShow) =>        //functions runs when user clicks on a show to visit it
    {
        console.log("/tv/" + idOfShow);
        window.scrollTo(0, 0);
        history.push("/tv/" + idOfShow);
    }

    let popularShowsList = [];
    if(popularShowsData)
    {
        for(var i=0; i<=5; i++)
        {
            const showId = popularShowsData.results[i].id;
            popularShowsList.push(
                    <div onClick={() => onShowClick(showId)} className="popularShowContainer">
                    <img className="poster" src={"https://image.tmdb.org/t/p/original" + popularShowsData.results[i].poster_path}></img>
                    <h3 className="title">{popularShowsData.results[i].name.length > 35 ? popularShowsData.results[i].name.substring(0, 35) + "..." : popularShowsData.results[i].name}</h3>
                    </div>
            )
        }
    }

    useEffect(() =>
    {
        FetchPopularShows();
    }, []);

    if(popularShowsData)
    return (
        <div>
           <h3 className="heading">Popular Shows</h3>
            <div className="popularShowListContainer">
                {popularShowsList}
            </div> 
        </div>
    )
    else
    return (<h3>Loading</h3>)
}

export default PopularShows
