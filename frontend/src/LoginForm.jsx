import React, {useState} from "react";
import {Route, Routes, Navigate, useNavigate} from "react-router-dom"


function LoginForm(props){
    const {authLoginInfo, shouldShowLogin, setMessage, message} = props
    const navigate = useNavigate()
    const INITIAL_STATE = {
        username: "",
        password: ""
    } 
    const [formData, setFormData] = useState(INITIAL_STATE)

    

    const handleChange = e => {
            const {name, value} = e.target
            setFormData(data =>({
                ...data,
                [name]: value
            }))
    }

    const handleSubmit = async e => {
            e.preventDefault()
            try{
                await authLoginInfo({...formData})            
                navigate("/")
                console.log("Login successful. Navigating to '/'...")
                setMessage("Login Success")
            }catch(err){
                console.error("Error logging in", err);
                setErrorMessage("Incorrect username or password.");
                console.log("Login unsuccessful.")
                setMessage(err)
            }   
    }


    return (
        <>
        {shouldShowLogin && (
            <>
            <br></br>
        <br></br>
        <br></br>
            <h1>HI PLEASE LOGIN</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input
                id="username"
                type="text"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={handleChange}
                />
                <br></br>
                <label htmlFor="password">Password: </label>
                <input
                id="password"
                type="text"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
                />
                <br></br>
                <button>Submit</button>
            </form>
            {setMessage && <p>{setMessage}</p>}
        
        
        </>
)}
    {message}
        </>
        )
    }

export default LoginForm