import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

import './MyLists.css'
import List from './List'

const MyLists = () => {

    const [listData, setListData] = useState(null);

    const FetchListsData = async () =>
    {
        try
        {
            const res = await axios.get("http://localhost:4000/lists/userlists", {headers : {"authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBhd2FuIiwicGFzc3dvcmQiOiJQYXdhbkJvc3MiLCJpYXQiOjE2MjMzODk5NTh9.WBhXEb0qkhmjdQwbxq72SZSC5yzuccYSoG6l6hSAYXc"}})
            setListData(res.data);
        }catch(err)
        {
            console.log(err);
        }
    } 

    let listsJSX = [];

    if(listData)
    {
        for(var i=0; i< listData.length; i++)
        {
            listsJSX.push(
                <List key={listData[i].listName} listName={listData[i].listName} color={"blue"} data={listData[i]}></List>
            )
        }
    }
    
    useEffect(() =>
    {
        FetchListsData();
    }, [])
    
    return (
        <div className="background">
            <div className="HeaderContainer">
                <h3 className="header">My Lists</h3>
            </div>
            <div className="ListsContainer">
                {listsJSX}
            </div>
            <div className="addnewlist">
                <h3 className="text">+ ADD NEW LIST</h3>
            </div>
        </div>
    )
}

export default MyLists
