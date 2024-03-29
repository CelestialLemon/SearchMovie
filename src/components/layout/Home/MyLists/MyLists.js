import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'

import { BiArrowBack } from 'react-icons/bi'
import './MyLists.css'
import List from './List'
import AddNewList from './AddNewList'

const MyLists = () => {

    let history = useHistory();
    const [listData, setListData] = useState(null);
    const [dataChanged, setDataChanged] = useState(0);     //state to reload page every time list is added
    

    const FetchListsData = async () =>
    {
        try
        {
            const res = await axios.get("https://api-search-a-movie-22.herokuapp.com/lists/userlists", 
            {
                headers : {"authorization" : "Bearer " + (localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken"))}
            })
            setListData(res.data);
        }catch(err)
        {
            console.log(err);
        }
    } 

    const reload = () =>
    {
        console.log('reload funciton called')
        setDataChanged(dataChanged + 1)
        setListsJSX();
    }


    let listsJSX = [];
    const [listJSXState, setListsJSXState] = useState([]);
   
    const setListsJSX = () =>
    {
        listsJSX = [];
        if(listData)
        {
        for(var i=0; i< listData.length; i++)
        {
            listsJSX.push(
                <List key={listData[i].listName} data={listData[i]} reload={reload}></List>
            )
        }
        setListsJSXState(listsJSX);

        }
    }
    

    const onNewListAdded = () =>
    {
        setDataChanged(dataChanged + 1);  //change a useless state to reload page
    }

    
    const onBackToHomeClick = () =>
    {
        history.push("/");
    }
    
    useEffect(() =>
    {
        FetchListsData();
       
    }, [dataChanged]) //fetched data on inital load and every time new list is added

    useEffect(() =>
    {
        setListsJSX();
    },[listData])
    
    return (
        <div className="background">
            <div className="HeaderContainer">
                <h3 className="header">My Lists</h3>
            </div>
            <div onClick={onBackToHomeClick}>
                <button className="backToHomeButton">
                    <BiArrowBack className="icon"></BiArrowBack>
                    Back To Home</button>
            </div>
            <div className="ListsContainer">
                {listJSXState}
            </div>
            <div className="divider">
            </div>
            <AddNewList onNewListAdded={onNewListAdded}></AddNewList>
        </div>
    )
}

export default MyLists
