import React from 'react'
import { useState } from 'react'

import axios from 'axios'

const Signup = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');
   

    const onSubmitClick = async (e) =>
    {
        try
        {
            const res = await axios.post("https://api-search-a-movie-22.herokuapp.com/users/signup", {"username" : username, "password" : password});
            //setDisplayResponse(true);
            setResponse(res.data.msg);
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
                <div className="formElement">
                    <div className="responseContainer">
                    <h3 className="response">{response}</h3>
                    </div>
                </div>
                
          </div>
       </div>  
        </div>
    )
}

export default Signup
