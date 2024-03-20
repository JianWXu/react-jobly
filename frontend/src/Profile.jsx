import React, {useContext} from "react";
import UserContext from "./userContext";


function Profile(){
    const {userToken, username} = useContext(UserContext)
    return (
        <h1>HI THIS IS YOUR PROFILE</h1>
    )
}


export default Profile