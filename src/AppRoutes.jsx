import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./pages/login/login";
import HomePage from "./pages/index/home";
import { AuthProvicer, AuthContext } from "./contexts/auth";
import { useContext } from "react";
import ChartsView from "./pages/charts/charts";
import EstoqueView from "./pages/estoque/estoque";



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
                    <Route exact path="/charts" element={<Private><ChartsView/></Private>} />
                    <Route exact path="/estoque" element={<Private><EstoqueView/></Private>} />
                </Routes>
            </AuthProvicer>
        </BrowserRouter>
    );
};

export default AppRoutes;