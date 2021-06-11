import React from 'react'
import{ useState, useEffect } from 'react'
import { useClickOutside } from 'react-click-outside-hook'
import axios from 'axios'

import './Searchbar.css'
import SearchedShowComponent from './SearchedShowComponent'

import { IoSearch, IoClose } from 'react-icons/io5'

const Searchbar = () => {

    const [searchQuery, setSearchQuery] = useState('');          //search input state
    const [searchData, setSearchData] = useState(null);           //data fetched from api
    const [searchedShowsCards, setSearchedShowsCards] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [ref, hasClickedOutside] = useClickOutside();

    const [displaySpinner, setDisplaySpinner] = useState(false);

    const FetchSearchData = async () =>
    {
        try
        {
            
            const res = await axios.get("https://api.themoviedb.org/3/search/tv", {params : {api_key : "06353fd3792f2599dd5cb140df26c423", query : searchQuery}})
            setSearchData(res.data);
            console.log("fetched data");
        }catch(err)
        {
            console.log(err);
        }
    } 
    
    const ExpandSearchBar = () =>
    {
        setIsExpanded(true);
    }

    const CollapseSearchBar = () =>
    {
        setIsExpanded(false);
    }

    
    const onResetClick = () =>
    {
        setSearchQuery('');
        CollapseSearchBar();
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(searchQuery !== "")
            FetchSearchData();
            setDisplaySpinner(false);
           
        }, 1500);

        return () => clearTimeout(delayDebounceFn)
      }, [searchQuery])

    
    useEffect(() =>
    {
        if(searchQuery !== "")
        {
                setSearchedShowsCards(<div className="spinner-border text-danger loading-spinner" role="status">
                                    <span class="sr-only"></span>
                                </div>);
        }
        else
        {
            setSearchedShowsCards(null);
        }
    }, [searchQuery])


    useEffect(() =>
    {
        if(searchData)
        {
            if(searchData.results)
            {
                if(searchData.results.length > 0)
                {
                    for(var i=0; i<searchData.results.length; i++)
                    {
                        const showId = searchData.results[i].id;
                        searchedShowsJSX.push(
                          <SearchedShowComponent data={searchData.results[i]}></SearchedShowComponent>  
                        );
                    }

                    setSearchedShowsCards(searchedShowsJSX)
                    console.log("cards changed")
                }
                else
                {
                    setSearchedShowsCards(<h3 className="noshowsfound">No TV Shows/Series found</h3>);
                }
            }
        }
        
    }, [searchData])

    
    const searchedShowsJSX = [];

    let containerCSS = {}
    if(isExpanded)
    {
        containerCSS = {
            height : "600px"
        }
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
            {isExpanded ? searchedShowsCards : <></>}
        </div>
       
    )
}

export default Searchbar
