import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { TwitterPicker } from 'react-color'
import Tippy from '@tippyjs/react'

import './AddNewList.css'

const AddNewList = ({onNewListAdded}) => {

    let history = useHistory();
    const [isExpanded, setIsExpanded] = useState(false);
    const [listName, setListName] = useState('');
    const [displayError, setDisplayError] = useState(false);

    const expandContainer = () =>
    {
            setIsExpanded(true);
    }

    const collapseContainer = () =>
    {
            setIsExpanded(false);
    }

    let containerCSS;
    let formCSS = {};
    
    

    if(isExpanded)
    {
        // containerCSS = {
        //     height : "640px"
        // }

        formCSS = {
            border : "2px solid orange",
            borderRadius : "10px",
            height : "150px"
        }

    }

    const onSubmitClick = async () =>
    {
        if(listName !== '')
        try
        {
            const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
            const data = {
                "listName" : listName
            }
            const res = await axios.post("https://api-search-a-movie-22.herokuapp.com/lists/addlist", data, {headers : {'authorization' : 'Bearer ' + token}})
           
            if(res.data.msg === "list already exists")
            {
                setDisplayError(true);
            }
            else
            {
                setDisplayError(false);
                const listData = {"listName" : listName, "shows" : []};
                onNewListAdded(listData);
                setListName('');
            }
        }catch(err)
        {
            console.log(err)
        }
    }

    return (
        <div className="AddListContainer" style={containerCSS}>
            <div className="addnewlist">
                {isExpanded ? 
                <h3 className="text" onClick={collapseContainer}>- GO BACK</h3> : 
                <h3 className="text" onClick={expandContainer}>+ ADD NEW LIST</h3>}
            </div>
            
            <div style={formCSS} className="AddListForm">
                {isExpanded ? 
            <input style={{background : "linear-gradient(to right, rgb(255, 69, 0), rgb(255, 165, 0))"}} className="nameInput" type="text" placeholder="Enter name for the list" value={listName} onChange={(e) => setListName(e.target.value)}></input>
              : <></>}
                {isExpanded ? <button className="submitButton" onClick={onSubmitClick}>SUBMIT</button>
             : <></>}
           
            {displayError ? <h3 className="error">List already exists!</h3> : <></>}
            

            
            </div>
            
        </div>
    )
}

export default AddNewList
