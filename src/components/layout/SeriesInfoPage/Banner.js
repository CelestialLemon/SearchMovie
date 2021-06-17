import React from 'react'
import axios from 'axios'
import Title from './Title'
import Description from './Description'
import Genres from './Genres'
import SeriesDetails from './SeriesDetails'
import AddToCustomListModal from './AddToCustomListModal'
import { useState, useEffect } from 'react'

import { onStartWatchingClick, onPutOnPauseClick, onMarkAsCompleteClick, onContinueWatchingClick, onAddToWatchLaterClick, onDropClick } from './ButtonClickFunctions'

import './SeriesInfoPage.css';
import { Button, Dropdown, Form, Modal, ProgressBar } from 'react-bootstrap'
import { AiFillPlayCircle, AiFillForward, AiOutlineSave, AiFillPauseCircle } from 'react-icons/ai';
import { FaBan } from 'react-icons/fa'
import { RiAddFill } from 'react-icons/ri';
import { MdDone, MdWatchLater } from 'react-icons/md'

const Banner = ({data, id, showStatus, showProgress}) => {

    let bannerCss;   //css for banner , written external instead of inline to make code look cleaner    
    const [st, setSt] = useState(showStatus);

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

    const AddToCustomList = async (customLists) =>
    {
        try
        {
            for(var i=0; i<customLists.length; i++)
            {
                if(customLists[i].checked === true)
                {
                    const res = await axios.post("http://localhost:4000/lists/addshowtolist", {
                    "listName" : customLists[i].listName,
                    "showId" : id,
                    "progress" : 0
                }, {headers : { 'authorization' : "Bearer " + localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')}
                })
                console.log("added "+ id + "to "  + customLists[i].listName)
                }
            }
        }catch(err)
        {
            console.log(err);
        }
    }

    

      //stores states of checkboxes temporarily and later is stored in state checkboxesState


    
    

    
   
    const DropDownButton = listsData ? (
        <AddToCustomListModal listsData={listsData} AddToCustomList={AddToCustomList}></AddToCustomListModal>
        ) : <></>

    let ProgressBarVariant;
    let ButtonsJSX = (
        <></>
    )

    if(st == "")
    {
        ButtonsJSX = (
            <div>
                <button className="button red" onClick={() => {onStartWatchingClick(id); setSt("Currently Watching")}}>
                            <AiFillPlayCircle className="icon"></AiFillPlayCircle>
                            Start Watching
                </button>
                <button className="button goldenrod" onClick={() => {onAddToWatchLaterClick(id); setSt("Watch Later")}}>
                            <MdWatchLater className="icon"></MdWatchLater>
                            Watch Later
                </button>
            </div>
        )
    }

    else if(st == "Currently Watching")
    {
        ProgressBarVariant = '';
        ButtonsJSX = (
            <div>
                <button className="button pause" onClick={() => {onPutOnPauseClick(id) ; setSt("On Pause")}}>
                            <AiFillPauseCircle className="icon"></AiFillPauseCircle>
                            Put on Pause
                </button>
                <button className="button completed" onClick={() => {onMarkAsCompleteClick(id); setSt("Completed")}}>
                            <MdDone className="icon"></MdDone>
                            Completed
                </button>
               
            </div>
        )
    }

    else if(st == "On Pause")
    {
        ProgressBarVariant = 'warning';
        ButtonsJSX = (
            <div>
                <button className="button continue" onClick={() => {onContinueWatchingClick(id); setSt("Currently Watching")}}>
                            <AiFillPlayCircle className="icon"></AiFillPlayCircle>
                            Continue
                </button>
                <button className="button drop" style={{color : "red"}} onClick={() => {onDropClick(id) ; setSt("")}}>
                            <FaBan className="icon"></FaBan>
                            Drop
                </button>
            </div>
        )
    }

    else if(st == "Watch Later")
    {
        ButtonsJSX = (
            <div>
                <button className="button red" onClick={() => {onStartWatchingClick(id); setSt("Currently Watching")}}>
                            <AiFillPlayCircle className="icon"></AiFillPlayCircle>
                            Start Watching
                </button>
                <button className="button goldenrod" style={{color : "rgba(0, 232, 50)"}}>
                            <MdDone className="icon"></MdDone>
                            Watch Later
                </button>
            </div>
        )
    }

    else if(st == "Completed")
    {
        ProgressBarVariant = 'success';
        ButtonsJSX = (
            <div>
                <button className="button completed"  style={{color : "rgba(0, 232, 50)"}}>
                            <MdDone className="icon"></MdDone>
                            Completed
                </button>
                
            </div>
        )
    }

    

    


    useEffect(() =>
    {
        FetchListsData();
    }, []);

   useEffect(() =>
   {
       setSt(showStatus);
   }, [showStatus])

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
                        {ButtonsJSX}
                        {DropDownButton}
                </div>
                
                {st != '' && st != 'Watch Later' && st != 'Completed'? 
                 <ProgressBar animated variant={ProgressBarVariant} now={showProgress}/>
                : <></>}

                {st == 'Completed'? 
                 <ProgressBar animated variant={ProgressBarVariant} now={100}/>
                : <></>}  
                
                
            
            </div>
        </div> 
        </div>
    )
}

export default Banner
