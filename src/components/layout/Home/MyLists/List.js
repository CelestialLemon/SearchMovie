import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'

import { Popover, OverlayTrigger, Button } from 'react-bootstrap'
import { AiOutlineMinusCircle, AiOutlineDelete, AiTwotoneDelete } from 'react-icons/ai'
import { AiOutlineDownCircle, AiFillUpCircle } from 'react-icons/ai'
import './List.css'

const List = ({data, reload}) => {

    const[isOpenModal, setIsOpenModal] = useState(false);
   const [isExpanded, setIsExpanded] = useState(false);
   const [isDeleted, setIsDeleted] = useState(false);

    const expandContainer = () =>
    {
            setIsExpanded(true);
    }

    const collapseContainer = () =>
    {
            setIsExpanded(false);
    }

    

    
    const FetchShowData = async (id) =>
    {
        try
        {
            const res = await axios.get('https://api.themoviedb.org/3/tv/' + id + '?api_key=06353fd3792f2599dd5cb140df26c423');
            return res.data;
        }catch(err)
        {
            console.log(err);
            return null;
        }
    }

    const [showsJSXState, setShowsJSXState] = useState(null);
    let showsJSX = [];
    const setShowsJSX = async () =>
    {
        showsJSX = [];
           for(var i=0; i<data.shows.length; i++)
            {
                const index = i;
                const showData = await FetchShowData(data.shows[i].showId);
                showsJSX.push(
                    <div key={showData.id} className="show">
                         <h3 className="name">{String("0" + (i + 1)).slice(-2) + ". " +showData.name}</h3>
                         <AiOutlineMinusCircle className="delete" onClick={(e) => onShowDelete(showData.id, index)}></AiOutlineMinusCircle>
                    </div>
                )
            }

            if(data.shows.length === 0)
            {
                showsJSX = (<h3>List empty</h3>)
            }

            setShowsJSXState(showsJSX);
    }


    const onShowDelete = async (id, indexToDelete) =>
    {
        console.log("deleting show : " + id + " from listname " + data.listName);
        try
        {
            const res = await axios.post("https://api-search-a-movie-22.herokuapp.com/lists/deleteshowfromlist", 
            {
                'listName' : data.listName,
                'showId' : id.toString()
            },
            {headers : {'authorization' : 'Bearer ' + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))}}
            )

           const newList = showsJSXState.filter((show, index) => index !== indexToDelete);
            console.log(newList);
            setShowsJSXState(newList);
            setShowsJSX();
            reload();
            
        }catch(err)
        {
            console.log(err);
        }
    }

    const onConfirmDelete = async() =>
    {
        try
        {

            console.log("delete function called");
            const res = await axios.post("https://api-search-a-movie-22.herokuapp.com/lists/deletelist", {"listName" : data.listName}, {headers : {'authorization' : 'Bearer ' + localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')}})
            console.log(res.data);
            setIsDeleted(true);
        }catch(err)
        {
            console.log(err)
        }
    }

    
   let ListContainerCSS = {
     background : 'linear-gradient(to right, rgb(255, 69, 0), rgb(255, 165, 0))'
   };
    if(isExpanded === true)
    {
        ListContainerCSS = {
            background : 'linear-gradient(to right, rgb(255, 69, 0), rgb(255, 165, 0))',
            height : ((data.shows.length * 70) + 60) + "px"
        }
       

        if(data.shows.length === 0)
        {
            ListContainerCSS.height = "100px"
        }
    }



   
    
    useEffect(() =>
    {
        setShowsJSX();
    }, [data]);

    
    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Confirm Delete</Popover.Title>
          <Popover.Content>
            Are you sure you want to delete '{data.listName}' list?
          </Popover.Content>
          <Button style={{margin : "5px 5px 5px 5px"}} variant="danger" onClick={onConfirmDelete}>Delete</Button>
        </Popover>
      );

    if(!isDeleted)
    return (
       
        <div style={ListContainerCSS} className="ListContainer">
           <div className="listHeader">
                <h3 className="listName">{data.listName}</h3>
                
                {(data.listName !== "Currently Watching" && 
                    data.listName !== "Watch Later" && 
                    data.listName !== "On Pause" && 
                    data.listName !== "Completed") ?

                    <OverlayTrigger trigger="click" placement="right" overlay={popover} rootClose>
                    <AiOutlineDelete className="delete" onClick={() => setIsOpenModal(true)}></AiOutlineDelete>
                    </OverlayTrigger>
                    
                    : 
                    <h3 className="delete"></h3>
                }
                    
                    {isExpanded ? 
                    <AiFillUpCircle className="arrow" onClick={collapseContainer}></AiFillUpCircle> : 
                    <AiOutlineDownCircle className="arrow" onClick={expandContainer}></AiOutlineDownCircle>}
                
            </div>
            {isExpanded ? showsJSXState : <></>}
        </div>
           
    )
    else
    return null;
}

export default List
