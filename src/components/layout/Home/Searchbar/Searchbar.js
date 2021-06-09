import React from 'react'
import{ useState, useEffect } from 'react'
import { useClickOutside } from 'react-click-outside-hook'

import './Searchbar.css'

import { IoSearch, IoClose } from 'react-icons/io5'

const Searchbar = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [ref, hasClickedOutside] = useClickOutside();

    const ExpandSearchBar = () =>
    {
        setIsExpanded(true);
    }

    const CollapseSearchBar = () =>
    {
        setIsExpanded(false);
    }

    let containerCSS = {}
    if(isExpanded)
    {
        containerCSS = {
            height : "600px"
        }
    }

    const onResetClick = () =>
    {
        setSearchQuery('');
        CollapseSearchBar();
    }

    useEffect(() =>
    {
        if(hasClickedOutside)
        CollapseSearchBar();
    }, [hasClickedOutside])

    return (
        <div ref={ref} style={containerCSS} className="SearchBarContainer">
            <div onFocus={ExpandSearchBar} className="SearchInputContainer">
                <IoSearch className="searchIcon"></IoSearch>
                <input className="SearchInput" placeholder="Search for TV Shows & Series" value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value)}}></input>
                <IoClose className="resetIcon" onClick={onResetClick}></IoClose>
            </div>
            {isExpanded ? <h3>loading</h3> : <></>}
        </div>
    )
}

export default Searchbar
