import React, {useContext} from "react";
import { Nav, Container, Navbar  } from "react-bootstrap";
import UserContext from "./userContext";

function NavBar({signOut}) {

  const {userToken, username} = useContext(UserContext)

  console.log("navbar", userToken)
  console.log("navbar", username)

  if(userToken && username){    
      return (
      <div className="navbar-container">
      <Navbar className="navbar">
        
          <Navbar.Brand href="/">Jobly</Navbar.Brand>
          <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/companies" className="nav-link">Companies</a>
          </li>
          <li className="nav-item">
            <a href="/jobs" className="nav-link">Jobs</a>
          </li>          
          <li className="nav-item">
            <a href="/profile" className="nav-link">Profile</a>
          </li>
          <li className="nav-item">
            <a href="/signout" className="nav-link" onClick={signOut}>Log out {username}</a>
          </li>
        </ul>
      </Navbar>
    
      </div>  
    );    
  } else {
    
      return (
      <div className="navbar-container">
      <Navbar className="navbar">
        
          <Navbar.Brand href="/">Jobly</Navbar.Brand>
          <ul className="navbar-nav">         
          <li className="nav-item">
            <a href="/login" className="nav-link">Login</a>
          </li>
          <li className="nav-item">
            <a href="/signup" className="nav-link">Signup</a>
          </li> 
        </ul>
      </Navbar>
    
      </div>
  
    );
    
  }
  
}

export default NavBar;
