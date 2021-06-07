import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

import './ImagesTab.css'

const ImagesTab = ({id}) => {
    const [imagesData, setImagesData] = useState(null);

    const FetchImagesData = async () =>
    {
        try
        {
            const res = await axios.get("https://api.themoviedb.org/3/tv/" + id +"/images", {params : {api_key : "06353fd3792f2599dd5cb140df26c423"}});
            setImagesData(res.data);
        }catch(err)
        {
            console.log(err);
        }
    }

    useEffect(() =>
    {
        FetchImagesData();
    }, [id]);

    if(imagesData)
    {
       const column0Images = [], column1Images = [], column2Images = [];

       let posterIndex = 0, backdropIndex = 0;
        let loopNumber = 0, currentColumnNumber = 0 ;
       while(posterIndex < imagesData.posters.length && backdropIndex < imagesData.backdrops.length)
       {
           let rng = Math.floor(Math.random() * 2);
           
           if(rng === 0)
           {
               //insert poster into current colummn
               if(currentColumnNumber == 0)
               column0Images.push(<img className="images" src={"http://image.tmdb.org/t/p/original" + imagesData.posters[posterIndex].file_path}/>)
               
               if(currentColumnNumber == 1)
               column1Images.push(<img className="images" src={"http://image.tmdb.org/t/p/original" + imagesData.posters[posterIndex].file_path}/>)
               
               if(currentColumnNumber == 2)
               column2Images.push(<img className="images" src={"http://image.tmdb.org/t/p/original" + imagesData.posters[posterIndex].file_path}/>)
               
               
               posterIndex++;
           }
           if(rng === 1)
           {
               //insert backdrop into current column
               if(currentColumnNumber == 0)
               column0Images.push(<img className="images" src={"http://image.tmdb.org/t/p/original" + imagesData.backdrops[backdropIndex].file_path}/>)
               
               if(currentColumnNumber == 1)
               column1Images.push(<img className="images" src={"http://image.tmdb.org/t/p/original" + imagesData.backdrops[backdropIndex].file_path}/>)
               
               if(currentColumnNumber == 2)
               column2Images.push(<img className="images" src={"http://image.tmdb.org/t/p/original" + imagesData.backdrops[backdropIndex].file_path}/>)
               
               backdropIndex++;
           }
           if(currentColumnNumber == 2)
           {
               currentColumnNumber = 0;
           }
           else
           {
               currentColumnNumber++;
           }
           loopNumber++;
       }

      

        return(
            <div className="imagesContainer">
                <div class="row">
                    <div class="column">
                        {column0Images}
                    </div>
                    <div class="column">
                       {column1Images}
                    </div>

                    <div class="column">
                       {column2Images}
                    </div>
                   
                   
                </div>
            </div>
        )
    }
    else
    return (<h3>Loading</h3>)
}

export default ImagesTab
