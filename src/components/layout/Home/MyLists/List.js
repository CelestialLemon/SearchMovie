import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'

import { AiOutlineMinusCircle} from 'react-icons/ai'
import { AiOutlineDownCircle, AiFillUpCircle } from 'react-icons/ai'
import './List.css'

const List = ({listName, color, data}) => {

    color = 'linear-gradient(to right, '+ data.color1 +', '+ data.color2 +' )'

   const [isExpanded, setIsExpanded] = useState(false);

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
            console.log('feteched data');
            return res.data;
        }catch(err)
        {
            console.log(err);
            return null;
        }
    }

    
   let ListContainerCSS = {
     background : color
   };
    if(isExpanded === true)
    {
        ListContainerCSS = {
            background : color,
            height : ((data.shows.length * 70) + 60) + "px"
        }
        
        if(data.shows.length === 0)
        {
            ListContainerCSS.height = "100px"
        }
    }



    let showsJSX = [];
    const [showsJSXState, setShowsJSXState] = useState(null);
    
    const setShowsJSX = async () =>
    {
           for(var i=0; i<data.shows.length; i++)
            {
                const showData = await FetchShowData(data.shows[i].showId);
                console.log(showData);
                showsJSX.push(
                    <div key={showData.id} className="show">
                         <h3 className="name">{String("0" + (i + 1)).slice(-2) + ". " +showData.name}</h3>
                         <AiOutlineMinusCircle className="delete" onClick={(e) => console.log(e)}></AiOutlineMinusCircle>
                    </div>
                )
            }

            if(data.shows.length === 0)
            {
                showsJSX = (<h3>List empty</h3>)
            }

            setShowsJSXState(showsJSX);
    
    }

    useEffect(() =>
    {
        setShowsJSX();
    }, [data])

    return (
        <div style={ListContainerCSS} className="ListContainer" onDoubleClick={expandContainer}>
            <div className="listHeader">
                <h3 className="listName">{listName}</h3>
                {isExpanded ? 
                <AiFillUpCircle className="arrow" onClick={collapseContainer}></AiFillUpCircle> : 
                <AiOutlineDownCircle className="arrow" onClick={expandContainer}></AiOutlineDownCircle>}
            </div>
            {isExpanded ? showsJSXState : <></>}
        </div>
    )
}

export default List
