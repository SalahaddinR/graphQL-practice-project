import React from 'react'
import {NavLink} from "react-router-dom"; 
import logo from "../assets/logo-02.png";

export default function Header() {
  return (
    <header className="app-header">
        <div className="logo">
            <img src={logo} alt="graphql-logo" className="logo-icon" />
            <span className="logo-text">Post Stack</span>
        </div>
        <nav className="menu">
            <NavLink to="/users" className="menu-item">users</NavLink>
            <NavLink to="/posts" className="menu-item">posts</NavLink>
            <NavLink to="/profile" className="menu-item">profile</NavLink>
        </nav>
    </header>
  )
}
