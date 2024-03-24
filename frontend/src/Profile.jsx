import React, {useContext, useState, useEffect} from "react";
import UserContext from "./userContext";
import { useNavigate } from "react-router-dom";
import JoblyApi from "../../api";

function Profile({ shouldShowPatch, setMessage, message }){
    
    const {user} = useContext(UserContext)
    const userObj = JSON.parse(user)
    console.log(userObj.username)
    
    const navigate = useNavigate

    const INITIAL_STATE = {
        username: userObj.username,
        firstName: userObj.firstName,
        lastName: userObj.lastName,
        email: userObj.email
    }

    const updateProfile = async (info) => {
        try{
          const res = await JoblyApi.patchUser(userObj.username, info)          
          return res;
        }catch(err){
          console.error("Error updating user", err)
          throw err
        }
      }

    const [formData, setFormData] = useState(INITIAL_STATE)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
          ...data,
          [name]: value
        }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await updateProfile(formData)
            navigate("/")
            console.log("update successful")
            setMessage("update successful")
        }catch(err){
            console.error("Error updating profile", err)
            setMessage(err.message)
            console.log("update unsuccessful")
        }
    }
    

    useEffect(() => {
        if (!user) {
          navigate("/"); 
        }
      }, [user]);


    return (
        <>
        {shouldShowPatch && (
            <>
            <br />
                  <br />
                  <br />
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username: </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      disabled
                    />
                    <br />                    
                    <label htmlFor="firstName">First Name: </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    <br />
                    <label htmlFor="lastName">Last Name: </label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    <br />
                    <label htmlFor="email">Email: </label>
                    <input
                      id="email"
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <button>Submit</button>
                  </form>
            </>
        )}
        </>
    )
}


export default Profile