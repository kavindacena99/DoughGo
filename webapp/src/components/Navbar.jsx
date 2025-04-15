import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar(){

    return(
        <nav>
            <Link style={{ color:"red", padding:"5px" }}>Logout</Link>
            <Link style={{ color:"red", padding:"5px" }}>Logout</Link>
        </nav>
    );
}

export default Navbar;