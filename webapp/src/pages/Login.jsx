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
        <div className="login-page">
            <div className="login-logo">
                <img src="/assets/logo/logo.jpg" alt="Logo" />
            </div>
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
                <div className="register-section">
                    <span>Haven't registered yet? </span>
                    <button
                        onClick={() => window.location.href = "/register"}
                        className="register-button"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Login;
