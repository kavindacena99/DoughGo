import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import logo from '../Img/LOGO.jpg';

function Navbar(){
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data and token on logout
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    const token = localStorage.getItem("token");

    return(
        <nav className="navbar">
            <Link to="/ownerdashboard" className="brand">
                <img src={logo} alt="Logo" className="logo" />
                DoughGo
            </Link>
            <div className="nav-links">
                <Link to="/additems">Items</Link>
                <Link to="/loaditems">Load Items</Link>
                <Link to="/adddrivers">Drivers</Link>
                <Link to="/specialorders">Special Orders</Link>
                <Link to="/complainsmessages">Complains & Messages</Link>
                {token && <Link to="/profile" className="profile-link" style={{ marginLeft: "15px" }}>Profile</Link>}
                {token && <a className="logout" onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</a>}
            </div>
        </nav>
    );
}

export default Navbar;
