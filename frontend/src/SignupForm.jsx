import React, {useState} from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";


function SignupForm({ signUp }){

    const INITIAL_STATE = {
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: ""
        }
    const navigate = useNavigate()
    
    const [formData, setFormData] = useState(INITIAL_STATE)

    console.log(formData)
    
    const handleChange = e => {
            const {name, value} = e.target
            setFormData(data => ({
                ...data,
                [name]: value
            }))
        }
    
    const handleSubmit = e =>{
            e.preventDefault()
            signUp({...formData})
            navigate("/")
        }
    
    
    return (
            <>
            <br></br>
            <br></br>
            <br></br>

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
            <label htmlFor="firstName">First Name: </label>
                <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="first name"
                value={formData.firstName}
                onChange={handleChange}
                />
<br></br>
            <label htmlFor="lastName">Last Name: </label>
                <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="last name"
                value={formData.lastName}
                onChange={handleChange}
                />

<br></br>
            <label htmlFor="email">Email: </label>
                <input
                id="email"
                type="text"
                name="email"
                placeholder="email"
                value={formData.email}
                onChange={handleChange}
                />
                <button>Submit</button>
            </form>
            </>
        )
    }


export default SignupForm