import React from 'react'
import { useState, useEffect} from 'react'
import axios from 'axios'

const CastTab = ({ id }) => {
    const [castData, setCastData] = useState(null);
    const [numOfCastToShow, setNumOfCastToShow] = useState(47);

    const FetchCastData = async () =>
    {
        try
        {
            const res = await axios.get("https://api.themoviedb.org/3/tv/" + id + "/aggregate_credits", { params : {api_key : "06353fd3792f2599dd5cb140df26c423"}});
            setCastData(res.data);
        }catch(err)
        {
            console.log(err);
        }
    }

    useEffect(() =>
    {
        FetchCastData();
    }, [])

    const onLoadMoreClick = () =>
    {
        setNumOfCastToShow(numOfCastToShow + 48);
    }

    if(castData)
    {

        const someVar = [];

        for(var i=0; i<=numOfCastToShow ; i++)
        {
            if(castData.cast[i])
            someVar.push(
                <div className="profileContainer">
                <img className="profilepicture" src={"http://image.tmdb.org/t/p/original" + castData.cast[i].profile_path}></img>
                <h3 className="name">{castData.cast[i].name}</h3>
                <h3 className="charactername">{"As " + castData.cast[i].roles[0].character}</h3>
            </div>
            );
        }


        const CastInfoJSX = (
            <div className="castContainer">
               {someVar}
            </div>
        );

        return (
            <div >
              {CastInfoJSX}
              {numOfCastToShow < castData.cast.length ? <button className="loadmore" onClick={onLoadMoreClick}>Load More</button> : <></>}
            </div>
         )
    }
    
    

    else
    return (<h3>Loading</h3>)
}

export default CastTab
