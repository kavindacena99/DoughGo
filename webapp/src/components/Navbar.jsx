import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';

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
            <Link to="/" className="brand">DoughGo</Link>
            <div className="nav-links">
                {token && <a className="logout" onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</a>}
            </div>
        </nav>
    );
}

export default Navbar;
