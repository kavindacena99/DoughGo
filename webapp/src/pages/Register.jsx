import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Register(){
    const [ firstname, setFirstname] = useState("");
    const [ lastname, setLastname] = useState("");
    const [ businessname, setBusinessname] = useState("");
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    
    const handleRegister = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            alert("Passwords do not match!");
            return;
        }

        try{
            await API.post("/auth/register", { firstname, lastname, businessname, email, password });
            navigate("/");   
        }catch(error){
            alert("Registration failed!");
        }
    };

    return(
        <div>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder='firstname' value={firstname} onChange={(e) => setFirstname(e.target.value)} required /><br />
                <input type="text" placeholder='lastname' value={lastname} onChange={(e) => setLastname(e.target.value)} required /><br />
                <input type="text" placeholder='businessName' value={businessname} onChange={(e)=> setBusinessname(e.target.value)} required /><br />
                <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
                <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
                <input type="password" placeholder='confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /><br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;