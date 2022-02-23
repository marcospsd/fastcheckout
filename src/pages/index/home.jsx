import { getListSubheaderUtilityClass } from "@mui/material";
import React, { useContext, useEffect, useState} from "react";
import { useResolvedPath } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import { getVendas } from "../../services/api";

import "./home.css"

const HomePage = () => {
    const { authenticated, logout } = useContext(AuthContext);
    const [venda, setVendas] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        (async () => {
            const response = await getVendas();
            console.log(response)
            setVendas(response.data);
            setLoading(false);
        }) () 
    }, []);

    const handleLogout = () => {
        logout()

    };

    if (loading) {
        <div className="loading">Carregando dados ....</div>;
    }
    return (
        <div className="container">
            <h1>Bem Vindo Usuario</h1>
            <div className="Diarios">
                <label>Vendas: 3</label>
                <label>Total Vendido: R$ 5000.00</label>
            </div>
            <div className="menu">
                <button onClick={handleLogout}>Logout</button>
                <button >Criar Venda</button>
            </div>
            <div className="vendas-container">
                {venda.map((venda) => (
                    <div className="view-venda" key={venda.ordem}>
                        <p><strong>Ordem: </strong>{venda.ordem}</p>
                        <p><strong>CPF: </strong>{venda.cpf}</p>
                        <p><strong>Total da Venda: </strong>R${venda.total_venda}</p>
                        <button id="excluir">X</button>
                        <div className="itens">
                            <button id="veritems">Itens na Venda</button>
                        </div>
                    </div>
                    
                ))}
            </div>
        </div>
    );
};

export default HomePage;