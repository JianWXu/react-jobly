import React, {useContext} from "react";
import UserContext from "./userContext";
import { Link } from "react-router-dom";

function Home(){
    const {userToken, username} = useContext(UserContext)
    console.log("home", userToken)
    if(userToken && username ){
        return (
            <>
            <h1>Jobly</h1>
            <h3>All the jobs in one, convenient place.</h3>
            <h2>Welcome Back, {username}</h2>
            </>
        )
    }else{
        return (
            <>
            <h1>Jobly</h1>
            <h2>All the jobs in one, convenient place.</h2>
            <Link to={"/login"}>
                <button>Log in</button>
            </Link>
            <Link to={"/signup"}>
            <button>Sign up</button>
        </Link>
        </>
        )
    }
    
}

export default Home