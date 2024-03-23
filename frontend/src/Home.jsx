import React, {useContext} from "react";
import UserContext from "./userContext";
import { Link, json } from "react-router-dom";

function Home(){
    const {user} = useContext(UserContext)
    
    
    if(user){
        return (
            <>
            <h1>Jobly</h1>
            <h3>All the jobs in one, convenient place.</h3>
            <h2>Welcome Back, {JSON.parse(user).firstName}</h2>
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