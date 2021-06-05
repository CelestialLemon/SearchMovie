import React from 'react'
import {Dropdown} from 'react-bootstrap'
import { useState } from 'react'


const SeasonSelect = ({ data, onSeasonChange}) => {

    const [currentSeason, setCurrentSeason] = useState('All Seasons');

    const onSeasonSelect = (seasonName) =>    //when the users uses dropdown menu to select season to view
    {
        setCurrentSeason(seasonName);
        onSeasonChange(seasonName);          //pass the name to parent componenet
    } 

    const DropdownMenu = [];
    DropdownMenu.push(<Dropdown.Item onClick={() => { onSeasonSelect ('All Seasons')}}>All Seasons</Dropdown.Item>)

    if(data)
    for(var i=1; i<= data.numOfSeasons; i++)
    {
        const message = "Season " + i;
        DropdownMenu.push(<Dropdown.Item onClick={() => onSeasonSelect(message)}>{'Season ' + i}</Dropdown.Item>);
    }


    if(data)
    return (
        <div className="seasonSelect">
            <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {currentSeason}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {DropdownMenu}
            </Dropdown.Menu>
            </Dropdown>
        </div>
    )
    else
    return (<h2>Loading</h2>)
   
}

export default SeasonSelect
