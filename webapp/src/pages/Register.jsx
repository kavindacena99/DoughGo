import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import './Register.css';
import logo from '../Img/LOGO.jpg';

function Register(){
    const [ firstname, setFirstname] = useState("");
    const [ lastname, setLastname] = useState("");
    const [ businessname, setBusinessname] = useState("");
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    
    const handleRegister = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            setError("Passwords do not match!");
            return;
        }

        try{
            await API.post("/auth/register", { firstname, lastname, businessname, email, password });
            navigate("/");   
        }catch(error){
            setError("Registration failed!");
        }
    };

    return(
        <>
        <div className="register-page">
            <div className="register-logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="register-container">
                <h2>Register</h2>
                <form className="register-form" onSubmit={handleRegister}>
                    {error && <div className="error-message">{error}</div>}
                    <input type="text" placeholder='First Name' value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                    <input type="text" placeholder='Last Name' value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                    <input type="text" placeholder='Business Name' value={businessname} onChange={(e)=> setBusinessname(e.target.value)} required />
                    <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <button type="submit">Register</button>
                </form>
                <div className="login-section">
                    <span>Already have an account? </span>
                    <button
                        onClick={() => navigate('/')}
                        className="login-button"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Register;
