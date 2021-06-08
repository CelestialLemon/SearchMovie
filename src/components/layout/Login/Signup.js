import React from 'react'
import { useState } from 'react'

import axios from 'axios'

const Signup = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberOnDevice, setRememberOnDevice] = useState(false);

    let displayResponse = false;
    let response = ''

    const onSubmitClick = async (e) =>
    {
        try
        {
            const res = await axios.post("http://localhost:4000/users/signup", {"username" : username, "password" : password});
            displayResponse = true;
            response = res.data;
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
                {displayResponse ? <div className="formElement">
                    <h3 className="forgotpassword">{response}</h3>
                </div> : (<></>)}
                
          </div>
       </div>  
        </div>
    )
}

export default Signup
