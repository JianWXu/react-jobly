import React, { useState, useEffect } from 'react'
import AppRoutes from "./Routes"
import NavBar from './NavBar'
import JoblyApi from '../../api'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import axios from 'axios'
import { useLocation } from "react-router-dom"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userToken, setUserToken] = useState("")
  const location = useLocation();
  const [message, setMessage] = useState("")
  const [username, setUsername] = useState("")

  const authLoginInfo = async (data) => {
    try {
      const res = await JoblyApi.verifyUser(data);
      console.log(data)
      // console.log(res);
      setUserToken(res.token);
      setIsLoggedIn(true)      
      setUsername(data.username)
    } catch (error) {
      console.error("Error logging in:", error);
      
    }
  };

  const signUp = (info) => {
    setUserToken(async (userToken) => await JoblyApi.makeUser(info))
    console.log(userToken)
  }

  const signOut = () => {
    setUserToken("")
    setUsername("")
    console.log("signed out", username)
  }

  useEffect(()=>{
    function loadUserInfo(){
      const currentUser = {token: userToken, username: username}
    }
    loadUserInfo
  }, [userToken])

  // Function to determine whether to show SignupForm based on current route
  const shouldShowSignUp = () => {
    return location.pathname === "/signup"
  }
  
  // Function to determine whether to show LoginForm based on current route
  const shouldShowLogin = () => {
    return location.pathname === "/login"
  }

  

  return (
    <>
    <NavBar signOut={signOut}/>
    <AppRoutes />
    {/* Conditional rendering of SignupForm based on route */}
    {shouldShowSignUp() && (<SignupForm signUp={signUp} shouldShowSignUp={shouldShowSignUp} setMessage={setMessage} message={message}/>)}
    {/* Conditional rendering of LoginForm based on route */}
    {shouldShowLogin() && (
      <LoginForm isLoggedIn={isLoggedIn} authLoginInfo={authLoginInfo} shouldShowLogin={shouldShowLogin} setMessage={setMessage} message={message}/>)}
  </>
  );
}

export default App
