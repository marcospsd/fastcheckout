import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import {api, createSession } from "../services/api";



export const AuthContext = createContext();


export const AuthProvicer = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        if(recoveredUser && token) {
            setUser(JSON.parse(recoveredUser));
            api.defaults.headers.Authorization = `token ${token}`
        }
        setLoading(false);
    }, []);


    const login = async (username, password) => {
        const response = await createSession(username, password);
        
        const loggedUser = response.data.nome
        const token = response.data.token

        localStorage.setItem("username", JSON.stringify(loggedUser));
        localStorage.setItem("token", token);

        api.defaults.headers.Authorization = `token ${token}`

        setUser(loggedUser);
        navigate("/")
    };

    
    const logout = () => {
        localStorage.removeItem("username")
        localStorage.removeItem("token")

        api.defaults.headers.Authorization = null;

        setUser(null);
        navigate("/login")
    };

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>{children}</AuthContext.Provider>
    )
}