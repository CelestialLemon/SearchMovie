import axios from 'axios'

const ValidateSessionToken = async () =>
{
    if(sessionStorage.getItem("accessToken") == null)
    return false;


    try
    {
        const res = await axios.post("https://api-search-a-movie-22.herokuapp.com/users/login", {headers: {'authorization' : 'Bearer ' + sessionStorage.getItem("accessToken")}});
        if(res.data.msg === "logged in with token")
        return true;
        else
        {
            console.log("Invalid Token");
            return false;
        }
        
    }catch(err)
    {
        console.log(err);
    }
}

export default ValidateSessionToken;