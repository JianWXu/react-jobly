import React from "react";
import { Nav, Container, Navbar  } from "react-bootstrap";

function NavBar({signOut}) {
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
          <a href="/login" className="nav-link">Login</a>
        </li>
        <li className="nav-item">
          <a href="/signup" className="nav-link">Signup</a>
        </li>
        <li className="nav-item">
          <a href="/profile" className="nav-link">Profile</a>
        </li>
        <li className="nav-item">
          <a href="/signout" className="nav-link" onClick={signOut()}>Signout</a>
        </li>
      </ul>
    </Navbar>
  
    </div>

  );
}

export default NavBar;
