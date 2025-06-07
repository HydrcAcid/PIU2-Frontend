import React from "react";

import '../styles/Sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="portrait">
                <h1 className="portrait-letter">K</h1>
            </div> 
            <h2 className="username">Krzysztof</h2>  
            <h4 className="email">Krzysztof.official95@gmail.com</h4>
            <hr className="sidebar-hr"/>
            <a className="sidebar-button">Join existing board</a>
            <a className="sidebar-button">Create new board</a>
        </div>
    );
};

export default Sidebar;