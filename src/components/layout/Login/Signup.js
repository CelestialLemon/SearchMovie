import React from 'react'
import { useState } from 'react'

import axios from 'axios'

const Signup = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(null);
    const [responseCSS, setResponseCSS] = useState({"color" : "white"});

    const onSubmitClick = async (e) =>
    {
        try
        {
            const res = await axios.post("https://api-search-a-movie-22.herokuapp.com/users/signup", {"username" : username, "password" : password});
            //setDisplayResponse(true);
            setResponse(res.data.msg);
            if(res.data.msg === "user already exists")
            {
                setResponseCSS({color : "red"})
            }
            else if(res.data.msg === "Signed Up successfully")
            {
                setResponseCSS({color : "green"})
            }
        }catch(err)
        {
            console.log(err);
        }
    }

    return (
        <div>
           <div className="PageContainer">
          <div className="signupContainer">
            
                <div className="formElement">
                    <h3 className="title">Sign-Up</h3>
                </div>
                <div className="formElement">
                    <input className="inputField" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                <div className="formElement">
                     <input className="inputField" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                 </div>
                
                <div className="formElement">
                    <button className="submit" onClick={onSubmitClick} type="submit">SIGN-UP</button>
                </div>
                
                <div className="formElement">
                    <a className="forgotpassword" href="/login">Login instead?</a>
                </div>
                {
                    response ? 
                    <div className="formElement">
                    <div style={responseCSS} className="responseContainer">
                    <h3  className="response">{response}</h3>
                    </div>
                </div>
                :
                <></>
                }
                
          </div>
       </div>  
        </div>
    )
}

export default Signup
