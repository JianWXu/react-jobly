import React, { useState, useEffect } from 'react'
import AppRoutes from "./Routes"
import NavBar from './NavBar'
import JoblyApi from '../../api'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import axios from 'axios'
import { useLocation } from "react-router-dom"
import UserContext from './userContext'

function App() {

  const INITIAL_STATE = "";

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userToken, setUserToken] = useState(INITIAL_STATE)  
  const [message, setMessage] = useState(INITIAL_STATE)
  const [username, setUsername] = useState(INITIAL_STATE)
  const location = useLocation();

  const authLoginInfo = async (data) => {
    try {
      const res = await JoblyApi.verifyUser(data);
      console.log(res);
      setUserToken(res);
      setIsLoggedIn(true)      
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

  const signOut = () => {
    setUserToken("")
    setUsername("")
    setIsLoggedIn(false)
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

  useEffect(() => {
    console.log("User token updated:", userToken);
    console.log("User name updated", username)
  }, [userToken, username]);

  return (
    <>
      <UserContext.Provider value={{ userToken: userToken, username: username }}>
        <NavBar signOut={signOut} isLoggedIn={isLoggedIn} />
        <AppRoutes />
        {/* Conditional rendering of SignupForm based on route */}
        {shouldShowSignUp() && (<SignupForm signUp={signUp} shouldShowSignUp={shouldShowSignUp} setMessage={setMessage} message={message}/>)}
        {/* Conditional rendering of LoginForm based on route */}
        {shouldShowLogin() && (
          <LoginForm isLoggedIn={isLoggedIn} authLoginInfo={authLoginInfo} shouldShowLogin={shouldShowLogin} setMessage={setMessage} message={message}/>)}
    </UserContext.Provider>
  </>
  );
}

export default App
