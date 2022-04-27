import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import {api, createSession } from "../services/api";




export const AuthContext = createContext();


export const AuthProvicer = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const recoveredUser = localStorage.getItem('nome');
        const token = localStorage.getItem('token');
        const codvend = localStorage.getItem('codvend');

        if(recoveredUser && token) {
            api.defaults.headers.Authorization = `token ${token}`
            setUser(JSON.parse(recoveredUser));
            
        }
        setLoading(false);
    }, []);


    const login = async (username, password) => {
        try{
        const response = await createSession(username, password)
        if(response.status !== 200){
            setError('Deu erro no coisa');
          }

        const loggedUser = response.data.nome
        const token = response.data.token
        const codvend = response.data.codvend
        const tipouser = response.data.tipouser

        localStorage.setItem("nome", JSON.stringify(loggedUser));
        localStorage.setItem("token", token);
        localStorage.setItem("codvend", JSON.stringify(codvend));
        localStorage.setItem("tipouser", JSON.stringify(tipouser))
    

        api.defaults.headers.Authorization = `token ${token}`

        setUser(loggedUser);

        switch (tipouser) {
            case "C":
                navigate("/")
                break
            case "V":
                navigate("/")
                break
            case "E":
                navigate("/estoque")
                break
            case "A":
                navigate("/charts")
                break
        }
        
        } catch(e){
            window.alert("Login ou senha Incorretos")
        };
    };
    
    const logout = () => {
        localStorage.removeItem("nome")
        localStorage.removeItem("token")
        localStorage.removeItem("codvend")
        localStorage.removeItem("tipouser")

        api.defaults.headers.Authorization = null;

        setUser(null);
        navigate("/login")
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>{children}</AuthContext.Provider>
    )
}