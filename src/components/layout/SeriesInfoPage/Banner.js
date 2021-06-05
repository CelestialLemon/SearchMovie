import React from 'react'
import Title from './Title'
import Description from './Description'
import Genres from './Genres'
import SeriesDetails from './SeriesDetails'

import './SeriesInfoPage.css'

const Banner = ({data}) => {

    let bannerCss;   //css for banner , written external instead of inline to make code look cleaner    

    if(data)        //after data is fetched css is set to avoid error at data.backdrop
    {
        bannerCss = 
        {
            height : "720px",
            minHeight : "720px",
            padding: "25px 150px",
            boxShadow: "0px -16px 43px 21px rgba(0, 0, 0, 0.6)",
            backgroundSize : "100%",
            background: "linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(" 
            + data.backdrop + ") no-repeat center center fixed",
            boxShadow: "inset 0px 0px 0px 0px black"
        };
    }


    return (
        <div>
           <div className="header" style={bannerCss}>
            
            <img src={data.poster} height="70%" style={{marginTop: "50px"}} alt="a;df"></img>
            
            <div className="details" style={{marginLeft : "100px", marginTop:"50px"}}>
                <Title data={data}></Title>
                <Description data={data}></Description>
                <SeriesDetails data={data}></SeriesDetails>
                <br></br>
                <Genres data={data}></Genres>
                
                <div style={{display:"flex"}}>
                    <button className="button red">+ Currently Watching</button>
                    <button className="button goldenrod" >+ Watch Later</button>
                </div>
            
            </div>
        </div> 
        </div>
    )
}

export default Banner
