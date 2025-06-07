import React from "react";
import "../styles/Navbar.css";

import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";


function drawMenu(currentUser, nav, logout, open, state) {
    const cls = state === true ? "navbar-menu-open" : "navbar-menu";
    
    return (
        <div className={cls}>
            <div className="menu-account">
                <div className="account-info">
                    <h2 className="menu-username">{currentUser?.username}</h2>
                    <p className="menu-email">{currentUser?.email}</p>
                </div>
                <h2 className="menu-avatar" style={{backgroundColor: currentUser?.color}}>{currentUser?.username[0]}</h2>
            </div>
            <hr className="separator"/>
            <a className="menu-button" onClick={() => {open(false); nav("/dashboard");}}>Dashboard</a>
            <a className="menu-button" onClick={() => {open(false); logout(); nav("/login");}}>Logout</a>
        </div>
    );
}

function Navbar() {
    const {currentUser} = useContext(AuthContext);
    const {logout} = useContext(AuthContext);
    const nav = useNavigate();
    const [open, setOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="logo">
                <h1 className="title">InterLinked</h1>
            </div>
            {(() => {
                if(currentUser !== null) {
                    return (
                        <div className="navbar-user" onClick={() => setOpen(!open)}>
                            <h3 className="navbar-username">{currentUser.username}</h3>
                            <h2 className="navbar-avatar" style={{backgroundColor: currentUser.color}}>
                                {currentUser.username[0]}
                            </h2>
                        </div>
                    );
                }
            })()}
            {drawMenu(currentUser, nav, logout, setOpen, open)}
        </nav>
    );
};

export default Navbar;