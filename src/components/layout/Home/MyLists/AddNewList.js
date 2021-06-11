import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { TwitterPicker } from 'react-color'
import Tippy from '@tippyjs/react'

import './AddNewList.css'

const AddNewList = () => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [listName, setListName] = useState('');

    const [color1, setColor1] = useState('#fff');
    const [color2, setColor2] = useState('#fff');

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
    let previewCSS = {
        background : "linear-gradient(to right, "+ color1 +", " + color2 +")"
    }
    

    if(isExpanded)
    {
        // containerCSS = {
        //     height : "640px"
        // }

        formCSS = {
            border : "2px solid orange",
            borderRadius : "10px",
            height : "300px"
        }

    }

    const onSubmitClick = async () =>
    {
        try
        {
            const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
            const data = {
                "listName" : listName,
                "color1" : color1,
                "color2" : color2
            }
            const res = await axios.post("http://localhost:4000/lists/addlist", data, {headers : {'authorization' : 'Bearer ' + token}})
            console.log(res.data);
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
                <div>
                    
                    <input style={previewCSS} className="nameInput" type="text" placeholder="Enter name for the list" onChange={(e) => setListName(e.target.value)}></input>
                    <Tippy interactive={true} placement={'bottom'} content={<TwitterPicker
                    color={color1}
                    onChangeComplete={changedColor => {setColor1(changedColor.hex)}}
                    ></TwitterPicker>}>
                        <button style={{backgroundColor : color1}} className="colorButton1">Color left</button>
                    </Tippy>

                    <Tippy interactive={true} placement={'bottom'} content={<TwitterPicker
                    color={color2}
                    onChangeComplete={changedColor => {setColor2(changedColor.hex)}}
                    ></TwitterPicker>}>
                        <button style={{backgroundColor : color2}} className="colorButton2">Color right</button>
                    </Tippy>

                    <button className="submitButton" onClick={onSubmitClick}>SUBMIT</button>
            </div>
            : <></>}
            </div>
            
        </div>
    )
}

export default AddNewList
