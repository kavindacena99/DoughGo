import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useState } from 'react';

function Login(){
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");

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
            alert("Login failed!");
        }
    };

    return(
        <div>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;