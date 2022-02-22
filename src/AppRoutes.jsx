import { BrowserRouter, Route, Routes, Navigate, useInRouterContext } from "react-router-dom";

import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import { AuthProvicer, AuthContext } from "./contexts/auth";
import { useContext } from "react";



const AppRoutes = () => {
    const Private = ({children}) =>{
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <div className="loading">Carregando...</div>
        }


        if(!authenticated) {
            return <Navigate to="/login" />
        }

        return children;
    }
    return (
        <BrowserRouter>
            <AuthProvicer>
                <Routes>
                    <Route exact path="/login" element={<LoginPage/>} />
                    <Route exact path="/" element={<Private><HomePage/></Private>} />
                </Routes>
            </AuthProvicer>
        </BrowserRouter>
    );
};

export default AppRoutes;