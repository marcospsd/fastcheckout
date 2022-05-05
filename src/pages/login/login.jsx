import React, { useState, useContext } from "react";
import { AuthContext } from '../../contexts/auth'
import "./login.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LogoDNZ from '../../statics/logodiniz.png'
import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import InputAdornment from '@mui/material/InputAdornment';
import { Alert } from "@mui/material";

const LoginPage = () => {
    const { authenticated, login} = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password)
    };


    return (

        <div id="login">
            <img src={ LogoDNZ } id="imgLogoDNZ"/>
            <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                    <TextField fullWidth label="Usuario" autoComplete='off' variant="outlined" type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)}
                               InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <AccountCircle />
                                  </InputAdornment>
                                ),
                              }}/>
                </div>
                <div className="field">
                    <TextField fullWidth label="Senha" autoComplete='off' variant="outlined"  type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <VpnKeyIcon />
                                    </InputAdornment>
                                ),
                                }}/>
                </div>
                <div className="actions">
                    <Button variant="contained" type="submit" id="entrar">Entrar</Button>
                </div>
            </form>
        </div>
    )
};

export default LoginPage;