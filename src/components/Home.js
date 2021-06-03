import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useHistory} from 'react-router-dom'

const Home = () => {
    const [searchString, setSearchString] = useState('');
    const [data, setData] = useState(null);

    let history = useHistory();
    
    const onSearchClick = async () =>
    {
        try
        {
            const res = await axios.get("https://api.themoviedb.org/3/search/tv", {params: { api_key : "06353fd3792f2599dd5cb140df26c423", query : searchString}})
            console.log(res.data);
            setData(res.data);
            history.push("/tv/" + res.data.results[0].id);
            //setShowResult(true);
            
        }catch(err)
        {
            console.error(err);
        }
    }

    
    return (
        <div>
            <label>Search for the tv show you want </label>
            <input type="text" onChange = {(e) => setSearchString(e.target.value)}></input>
            <button onClick={onSearchClick}>Search</button>
            
        </div>
    )
}

export default Home
