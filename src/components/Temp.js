import React from 'react'
import { useState } from 'react'
import Compress from 'react-image-file-resizer'

const Temp = () => {

    const [res, setRes] = useState(null);
    Compress.imageFileResizer("http://image.tmdb.org/t/p/original/kysKBF2CJG9qfQDSCDaboJrkZy1.jpg", 600, 360, 'JPG', 100, 0, (uri) => console.log(uri))
  
    if(res)
    return(
       <div>
        <img src={res}></img>
       </div>
   )
   else
   return (<h3>loading</h3>)
}

export default Temp
