import React from 'react'
import { useState } from 'react'

const Navbar = ({onTabChange}) => {

    const [activeTab, setActiveTab] = useState("SeasonsTab");

     let buttonCSS = {
        "SeasonsButtonCSS" : {
            color : "white",
            backgroundColor : "black"
            },

            "CastButtonCSS" : {
                color : "white",
                backgroundColor : "black"
                },

            "ImagesButtonCSS" : {
                color : "white",
                backgroundColor : "black"
                },
            
            "RecommendedButtonCSS" : {
                color : "white",
                backgroundColor : "black"
                },

     }

    

    if(activeTab == 'SeasonsTab')
    {
        buttonCSS.SeasonsButtonCSS.backgroundColor = "orange";
        buttonCSS.SeasonsButtonCSS.color = "black"
    }
    
    else if(activeTab == 'CastTab')
    {
        buttonCSS.CastButtonCSS.backgroundColor = "orange";
        buttonCSS.CastButtonCSS.color = "black"
    }
    else if(activeTab == 'ImagesTab')
    {
        buttonCSS.ImagesButtonCSS.backgroundColor = "orange";
        buttonCSS.ImagesButtonCSS.color = "black"
    }
    else if(activeTab == 'RecommendedTab')
    {
        buttonCSS.RecommendedButtonCSS.backgroundColor = "orange";
        buttonCSS.RecommendedButtonCSS.color = "black"
    }

    const onClick = (e) =>
    {
        onTabChange(e.target.value);
        setActiveTab(e.target.value);
    }

    return (
        <div className="navbar">
            <button style={buttonCSS.SeasonsButtonCSS} className="btn btn-outline-secondary item" value="SeasonsTab" onClick={(e) => {onClick(e)}}>Seasons</button>
            <button style={buttonCSS.CastButtonCSS} className="btn btn-outline-secondary item" value="CastTab" onClick={(e) => {onClick(e)}}>Cast</button>
            <button style={buttonCSS.ImagesButtonCSS} className="btn btn-outline-secondary item" value="ImagesTab" onClick={(e) => {onClick(e)}}>Images</button>
            <button style={buttonCSS.RecommendedButtonCSS} className="btn btn-outline-secondary item" value="RecommendedTab" onClick={(e) => {onClick(e)}}>Recommended</button>
       </div>
    )
}

export default Navbar
