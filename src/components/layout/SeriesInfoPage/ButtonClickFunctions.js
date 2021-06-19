import axios from "axios";
import { MdViewModule } from "react-icons/md";

export const onStartWatchingClick = async (id) =>
{
    try
    {
        const res = await axios.post('http://localhost:4000/lists/addshowtolist',
        {
            "listName" : "Currently Watching",
            "showId" : id.toString(),
            "progress" : 0
        },
        {
            headers : {
                'authorization' : "Bearer " + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))
            }
        });
        //delete show from watch later
        const res2 = await axios.post('http://localhost:4000/lists/deleteshowfromlist',
        {
            "listName" : "Watch Later",
            "showId" : id.toString(),
        },
        {
            headers : {
                'authorization' : "Bearer " + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))
            }
        });
        console.log(res.data);
    }catch(err)
    {
        console.log(err);
    }
}

export const onPutOnPauseClick = async (id) =>
{
    try
    { //get data of the show from currently watching list
        const res = await axios.post('http://localhost:4000/shows/getshowfromlist',
        {
            "listName" : "Currently Watching",
            "showId" : id.toString()
        },
        {
            headers : {
                'authorization' : "Bearer " + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))
            }
        });

        //add the show to on pause list
        const res2 = await axios.post('http://localhost:4000/lists/addshowtolist',
        {
            "listName" : "On Pause",
            "showId" : id.toString(),
            "progress" : res.data.progress
        },
        {
            headers : {
                'authorization' : "Bearer " + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))
            }
        });

        //delete the show from currently watching
        const res3 = await axios.post('http://localhost:4000/lists/deleteshowfromlist',
        {
            "listName" : "Currently Watching",
            "showId" : id.toString(),
        },
        {
            headers : {
                'authorization' : "Bearer " + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))
            }
        });
    }catch(err)
    {
        console.log(err);
    }
}

export const onContinueWatchingClick = async (id) =>
{
    try
    { //get data of the show from on pause list
        const res = await axios.post('http://localhost:4000/shows/getshowfromlist',
        {
            "listName" : "On Pause",
            "showId" : id.toString()
        },
        {
            headers : {
                'authorization' : "Bearer " + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))
            }
        });

        //add the show tocurrently watching
        const res2 = await axios.post('http://localhost:4000/lists/addshowtolist',
        {
            "listName" : "Currently Watching",
            "showId" : id.toString(),
            "progress" : res.data.progress
        },
        {
            headers : {
                'authorization' : "Bearer " + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))
            }
        });

        //delete the show from currently watching
        const res3 = await axios.post('http://localhost:4000/lists/deleteshowfromlist',
        {
            "listName" : "On Pause",
            "showId" : id.toString(),
        },
        {
            headers : {
                'authorization' : "Bearer " + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))
            }
        });
    }catch(err)
    {
        console.log(err);
    }
}

export const onAddToWatchLaterClick = async (id) =>
{
    try
    {
        const res = await axios.post('http://localhost:4000/lists/addshowtolist', 
        {
            "listName" : "Watch Later",
            "showId" : id.toString()
        },
        {
            headers : {
                'authorization' : "Bearer " + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))
            }
        });

        console.log(res.data);
    }catch(err)
    {
        console.log(err);
    }
}

export const onMarkAsCompleteClick = async (id) =>
{
    try
    {
        //get data of the show from currently watching list
        const res = await axios.post('http://localhost:4000/shows/getshowfromlist',
        {
            "listName" : "Currently Watching",
            "showId" : id.toString()
        },
        {
            headers : {
                'authorization' : "Bearer " + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))
            }
        });

        //add the show to on completed list
        const res2 = await axios.post('http://localhost:4000/lists/addshowtolist',
        {
            "listName" : "Completed",
            "showId" : id.toString(),
            "progress" : 100
        },
        {
            headers : {
                'authorization' : "Bearer " + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))
            }
        });

        //delete the show from currently watching
        const res3 = await axios.post('http://localhost:4000/lists/deleteshowfromlist',
        {
            "listName" : "Currently Watching",
            "showId" : id.toString(),
        },
        {
            headers : {
                'authorization' : "Bearer " + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))
            }
        });
    }catch(err)
    {
        console.log(err);
    }
}

export const onDropClick = async (id) =>
{
    try
    {
        const res = await axios.post('http://localhost:4000/lists/deleteshowfromlist',
        {
            "listName" : "On Pause",
            "showId" : id.toString()
        },
        {
            headers : {
                'authorization' : "Bearer " + (localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken'))
            }
        })
    }catch(err)
    {
        console.log(err);
    }
}



