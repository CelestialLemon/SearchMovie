import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import './RecommendedTab.css'

const RecommendedTab = ({ id }) => {

    let history = useHistory();                  //to redirect to the show page that the user clicks

    const [recommendationsData, setRecommendationsData] = useState(null);    //state to store the data fetched for recommended shows
    const [similarShowsData, setSimilarShowsData] = useState(null);            //state to store the data fetched for similar shows
    
    const FetchRecommendationsData = async () =>
    {
        try
        {
            const res = await axios.get("https://api.themoviedb.org/3/tv/" + id + "/recommendations", { params : {api_key : "06353fd3792f2599dd5cb140df26c423"}})
            setRecommendationsData(res.data);
        }catch(err)
        {
            console.log(err);
        }
    }

    const FetchSimilarShowsData = async () =>
    {
        try
        {
            const res = await axios.get("https://api.themoviedb.org/3/tv/" + id + "/similar", { params : {api_key : "06353fd3792f2599dd5cb140df26c423"}})
            console.log(res.data);
            setSimilarShowsData(res.data);
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

    let RecommendedShows = [];              //stores the jsx elements of recommended shows to be displayed
    if(recommendationsData)        
    {
        for(var i=0; i<=5; i++)
        {
            const showId = recommendationsData.results[i].id
            RecommendedShows.push(
                <div onClick={() => onShowClick(showId)} className="recommendedShowContainer">
                     <img className="poster" src={"https://image.tmdb.org/t/p/original" + recommendationsData.results[i].poster_path}></img>
                     <h3 className="title">{recommendationsData.results[i].name.length > 35 ? recommendationsData.results[i].name.substring(0, 35) + "..." : recommendationsData.results[i].name}</h3>
                 </div>
            )
        } 
    }

    let SimilarShows = [];                      //stores the jsx elements of similar shows to be displayed
    if(similarShowsData)
    {
        for(var i=0; i<=5; i++)
        {
            const showId = similarShowsData.results[i].id
            SimilarShows.push(
                <div onClick={() => onShowClick(showId)} className="recommendedShowContainer">
                    <img className="poster" src={"https://image.tmdb.org/t/p/original" + similarShowsData.results[i].poster_path}></img>
                    <h3 className="title">{similarShowsData.results[i].name.length > 35 ? similarShowsData.results[i].name.substring(0, 35) + "..." : similarShowsData.results[i].name}</h3>
                </div> 
            )
        }
    }
   
    useEffect(() =>                             //runs every time the id of show to be displayed changes 
    {                                           //so the componenet fetches new data to be displayed
       FetchRecommendationsData();
        FetchSimilarShowsData();
    }, [id]);

    

    if(recommendationsData)
    return (
        <div >
            <h3 className="heading">Show Recommended for this item</h3>
            <div className="recommendedListContainer">
                {RecommendedShows}
            </div>
            <h3 className="heading">Similar shows</h3>
            <div className="recommendedListContainer">
                {SimilarShows}
            </div>
       </div>

    )
    else
    return (<h3>Loading</h3>)
}

export default RecommendedTab
