import React from 'react'
import '../styles/header.css'
import {NavLink} from 'react-router-dom'
const Header = () =>{
    return(
        <header>
            <div className="header">
                <div className="headerContent">
                    <h3 className="logo">HouseMuv</h3>
                    <nav className="nav">
                        <NavLink className="link" to ="/">Home</NavLink>
                        <NavLink className="link" to ="/sign-in">Sign In</NavLink>
                        <NavLink className="link" to ="/sign-up">Sign Up</NavLink>
                        <NavLink className="link" to ="/buy">Buy a House</NavLink>
                        <NavLink className="link" to ="/sell">Sell a House</NavLink> 
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header