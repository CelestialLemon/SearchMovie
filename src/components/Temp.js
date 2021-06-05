import React from 'react'
import { useState, useEffect } from 'react'
import analyze from 'rgbaster'
import axios from 'axios'

import './layout/SeriesInfoPage/Tabs/ImagesTab/ImagesTab.css'
const Temp = () => {

    const [imagesData, setImagesData] = useState(null);

    const FetchImagesData = async () =>
    {
        try
        {
            const res = await axios.get("https://api.themoviedb.org/3/tv/46261/images", {params : {api_key : "06353fd3792f2599dd5cb140df26c423"}});
            console.log("num of bacdrops : " + res.data.backdrops.length + " num of posters : " + res.data.posters.length);
            setImagesData(res.data);
        }catch(err)
        {
            console.log(err);
        }
    }

    useEffect(() =>
    {
        FetchImagesData();
    }, []);

    if(imagesData)
    {
       const column0Images = [], column1Images = [], column2Images = [];

       let posterIndex = 0, backdropIndex = 0;
        let loopNumber = 0, currentColumnNumber = 0 ;
       while(posterIndex < imagesData.posters.length && backdropIndex < imagesData.backdrops.length)
       {
           let rng = Math.floor(Math.random() * 2);
           console.log("loop number " + loopNumber + " result :" + rng);

           if(rng === 0)
           {
               //insert poster into current colummn
               if(currentColumnNumber == 0)
               column0Images.push(<img src={"http://image.tmdb.org/t/p/original" + imagesData.posters[posterIndex].file_path}/>)
               
               if(currentColumnNumber == 1)
               column1Images.push(<img src={"http://image.tmdb.org/t/p/original" + imagesData.posters[posterIndex].file_path}/>)
               
               if(currentColumnNumber == 2)
               column2Images.push(<img src={"http://image.tmdb.org/t/p/original" + imagesData.posters[posterIndex].file_path}/>)
               
               
               posterIndex++;
           }
           if(rng === 1)
           {
               //insert backdrop into current column
               if(currentColumnNumber == 0)
               column0Images.push(<img src={"http://image.tmdb.org/t/p/original" + imagesData.backdrops[backdropIndex].file_path}/>)
               
               if(currentColumnNumber == 1)
               column1Images.push(<img src={"http://image.tmdb.org/t/p/original" + imagesData.backdrops[backdropIndex].file_path}/>)
               
               if(currentColumnNumber == 2)
               column2Images.push(<img src={"http://image.tmdb.org/t/p/original" + imagesData.backdrops[backdropIndex].file_path}/>)
               
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

       console.log("number of backdrops printed " + backdropIndex);
       console.log(" num of posters printed : " + posterIndex);
    

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

export default Temp
