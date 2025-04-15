import { useNavigate } from 'react-router-dom';

function LogoutButton(){
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return(
        <button onClick={handleLogout} style={{ color:"red", padding:"5px" }}>Logout</button>
    );
}

export default LogoutButton;