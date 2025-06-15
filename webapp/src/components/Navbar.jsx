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
            <Link to="/" className="brand">
                <img src="/assets/logo/logo.jpg" alt="Logo" className="logo" />
                DoughGo
            </Link>
            <div className="nav-links">
                <Link to="/seeitems">See Items</Link>
                <Link to="../components/Additems">Load Items</Link>
                <Link to="/drivers">Drivers</Link>
                <Link to="/items">Items</Link>
                <Link to="/routes">Routes</Link>
                {token && <a className="logout" onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</a>}
            </div>
        </nav>
    );
}

export default Navbar;
