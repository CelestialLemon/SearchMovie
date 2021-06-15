import React from 'react'
import axios from 'axios'
import Title from './Title'
import Description from './Description'
import Genres from './Genres'
import SeriesDetails from './SeriesDetails'
import AddToCustomListModal from './AddToCustomListModal'
import { useState, useEffect } from 'react'

import './SeriesInfoPage.css';
import { Button, Dropdown, Form, Modal } from 'react-bootstrap'
import { AiFillPlayCircle, AiFillForward, AiOutlineSave } from 'react-icons/ai';
import { RiAddFill } from 'react-icons/ri';

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

    const [listsData, setListsData] = useState(null);

    const FetchListsData = async () =>
    {
        try
        {
            const res = await axios.get('http://localhost:4000/lists/userlists', {headers : {'authorization' : "Bearer " + localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')}});
            setListsData(res.data);
        }catch(err)
        {
            console.log(err);
        }
    }

    

      //stores states of checkboxes temporarily and later is stored in state checkboxesState


    
    

    
   
    const DropDownButton = listsData ? (
        <AddToCustomListModal listsData={listsData}></AddToCustomListModal>
        ) : <></>


    useEffect(() =>
    {
        FetchListsData();
    }, []);

   

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
                    <button className="button red">
                        <AiFillPlayCircle className="icon"></AiFillPlayCircle>
                        Currently Watching</button>
                    <button className="button goldenrod" >
                        <AiFillForward className="icon"></AiFillForward>
                        Watch Later</button>
                        {DropDownButton}
                </div>
                
            
            </div>
        </div> 
        </div>
    )
}

export default Banner
