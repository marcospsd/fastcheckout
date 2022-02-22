import React, { useState, useContext } from "react";
import { AuthContext } from '../contexts/auth'
import "./login.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LogoDNZ from '../statics/logodiniz.png'


const LoginPage = () => {
    const { authenticated, login} = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
    };

    return (

        <div id="login">
            <img src={ LogoDNZ }/>
            <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                    <TextField fullWidth label="Usuario" variant="filled" type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="field">
                    <TextField fullWidth label="Senha" variant="filled"  type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="actions">
                    <Button variant="contained" type="submit" id="entrar">Entrar</Button>
                </div>
            </form>
        </div>
    )
};

export default LoginPage;