import axios from 'axios'

const ValidateLocalToken = async () =>
{
    if(localStorage.getItem("accessToken") == null)
    return false;


    try
    {
        const res = await axios.post("http://localhost:4000/users/login", '' , {'headers': {'authorization' : 'Bearer ' + localStorage.getItem("accessToken")}});
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

export default ValidateLocalToken;