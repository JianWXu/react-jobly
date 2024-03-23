import React, { useState, useEffect } from 'react'
import { useLocalStorage } from "@uidotdev/usehooks";
import AppRoutes from "./Routes"
import NavBar from './NavBar'
import JoblyApi from '../../api'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import Profile from './Profile';
import axios from 'axios'
import { useLocation } from "react-router-dom"
import UserContext from './userContext'

function App() {

  const INITIAL_STATE = "";

  const [userToken, setUserToken] = useState(INITIAL_STATE)  
  const [message, setMessage] = useState(INITIAL_STATE)
  const [username, setUsername] = useState(INITIAL_STATE)
  const [user, setUser] = useLocalStorage("user", INITIAL_STATE)
  const location = useLocation();

  useEffect(()=>{
    async function getUser() {
      try {
        if(username){
          const res = await JoblyApi.getUser(username)
          console.log(res)
          setUser(JSON.stringify(res.user))
        }  
      } catch(err) {
        console.error("Error finding user", error)
      }
    }
    getUser()
  },[user, username, setUser])

  
  const authLoginInfo = async (data) => {
    try {
      const res = await JoblyApi.verifyUser(data);
      console.log(res);
      setUserToken(res.token)
      setUsername(data.username)
    } catch (error) {
      console.error("Error logging in:", error);
      
    }
  };

  const signUp = async (info) => {
    try{
      const res = await JoblyApi.makeUser(info);
      setUserToken(prevUserToken => {
        // This callback function executes after userToken has been updated
        console.log("new user token", res);
        return res; // Return the updated userToken
      });
      setUsername(info.username)
      
      await console.log("new username", info.username)
    }catch(err){
      console.error("Error signing up:", err)
    }    
  }

  //Function to clear all states to sign user out
  const signOut = () => {
    setUserToken(INITIAL_STATE)
    setUsername(INITIAL_STATE)
    setUser(INITIAL_STATE)
    console.log("signed out", username)
  }

  
 
  // Function to determine whether to show SignupForm based on current route
  const shouldShowSignUp = () => {
    return location.pathname === "/signup"
  }
  
  // Function to determine whether to show LoginForm based on current route
  const shouldShowLogin = () => {
    return location.pathname === "/login"
  }

  const shouldShowPatch = () => {
    return location.pathname === "/profile"
  }


  return (
    <>
      <UserContext.Provider value={{user}}>
        <NavBar signOut={signOut} />
        <AppRoutes />
        {/* Conditional rendering of SignupForm based on route */}
        {shouldShowSignUp() && (<SignupForm signUp={signUp} shouldShowSignUp={shouldShowSignUp} setMessage={setMessage} message={message}/>)}
        {/* Conditional rendering of LoginForm based on route */}
        {shouldShowLogin() && (
          <LoginForm authLoginInfo={authLoginInfo} shouldShowLogin={shouldShowLogin} setMessage={setMessage} message={message}/>)}
        {/* Conditional rendering of SignupForm based on route */}
        {shouldShowPatch() && (<Profile  shouldShowPatch={shouldShowPatch} setMessage={setMessage} message={message}/>)}
    </UserContext.Provider>
  </>
  );
}

export default App
