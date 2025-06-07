import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useState } from 'react';
import './Login.css';

function Login(){
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const response = await API.post("/auth/login", { email, password });
            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            
            navigate("/ownerdashboard");
        }catch(error){
            setError("Login failed! Please check your credentials.");
        }
    };

    return(
        <>
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                {error && <div className="error-message">{error}</div>}
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="password">Password</label>
                <input id="password" type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <button
                onClick={() => window.location.href = "/register"}
                style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "1rem"
                }}
            >
                Register
            </button>
        </div>
        </>
    );
}

export default Login;
