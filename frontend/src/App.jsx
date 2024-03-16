import React, { useState } from 'react'
import AppRoutes from "./Routes"
import NavBar from './NavBar'
import viteLogo from '/vite.svg'
import JoblyApi from '../../api'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import axios from 'axios'

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userToken, setUserToken] = useState()
  // const authLoginInfo = (data) => {

  // }
  const signUp = (info) =>{
    setUserToken(async (userToken) => await JoblyApi.makeUser(info))
    console.log(userToken)
  }

  return (
       <>
        <NavBar />         
        <AppRoutes />
        <SignupForm signUp={signUp} />        
    </>
  )
}

export default App
