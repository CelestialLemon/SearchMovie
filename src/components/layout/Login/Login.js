import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import './Login.css'
import ValidateLocalToken from '../../../functions/ValidateLocalToken'
import ValidateSessionToken from '../../../functions/ValidateSessionToken'

const Login = () => {
   
    let history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberOnDevice, setRememberOnDevice] = useState(false);
    const [response, setResponse] = useState(null);
    const [responseCSS, setResponseCSS] = useState({"color" : "white"});
    
    
    const ValidateUser = async () =>
    {
        const res = await ValidateLocalToken();
        const sessionRes = await ValidateSessionToken();

        if(res === true || sessionRes === true)
        {
            history.push("/");
        }
    }
    
    ValidateUser();

    
    const onSubmitClick = async (e) =>
    {
        console.log("Submit was clicked");
        try
        {
            const user = {
                "username" : username,
                "password" : password,
                "rememberOnDevice" : rememberOnDevice
            };

            const res = await axios.post("http://localhost:4000/users/login", user);
            setResponse(res.data.msg);
            if(res.data.msg === "User doesn't exist" || res.data.msg === "password doesn't match")
            {
                setResponseCSS({color : "rgb(255, 0, 0)"});
            }
            if(res.data.msg === "token created" || res.data.msg === "logged In for session")
            {
                setResponseCSS({color : "green"})
            }
            if(res.data.loggedIn == true)
            {
                console.log(res.data.msg);
                if(res.data.msg === "token created")
                {
                    console.log("accessToken recieved");
                    localStorage.setItem("accessToken", res.data.accessToken);
                }

                if(res.data.msg === "logged In for session")
                {
                    console.log("session token recieved");
                    sessionStorage.setItem("accessToken", res.data.sessionToken);
                }
                
                history.push("/")
            }
            else if(res.data.loggedIn == false)
            {
                console.log(res.data.msg)
            }
            else
            {
                console.log("unknown error");
            }
        }catch(err)
        {
            console.log(err);
        }
    }

    return(
       <div className="PageContainer">
          <div className="signupContainer">
          <div className="formElement">
                    <h3 className="title">Login</h3>
                </div>
                <div className="formElement">
                    <input className="inputField" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                <div className="formElement">
                     <input className="inputField" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                 </div>
                 <div className="formElement">
                    <label className="text"><input className="checkbox" type="checkbox" onChange={e => setRememberOnDevice(e.target.checked)}></input>Remember me on this device</label>
                </div>
                <div className="formElement">
                    <button className="submit" onClick={onSubmitClick} type="submit">LOGIN</button>
                </div>
                
                <div className="formElement">
                    <a className="forgotpassword" href="/signup">Sign-Up Here</a>
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
   )
}

export default Login
