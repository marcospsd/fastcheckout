import * as React from 'react';
import { AuthContext } from "../../contexts/auth";
import { deleteVendas } from "../../services/api";
import { useFetch } from "../../hooks/useFetch";
import IMGFastCheckout from "../../statics/FAST.png"
import "./home.css"

import BasicModal from '../../components/Modal/modal'
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { CircularProgress } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';




const HomePage = () => {
    const user = (localStorage.getItem('nome')).replace('"', '').replace('"', '').toUpperCase()
    const { data, mutate } = useFetch('/api/v2/venda/');
    const { logout } = React.useContext(AuthContext);
    
    if (!data) {
        return <CircularProgress />
    }
    

////// Conversão para Reais dos dados da Api    
    const Faturado = data.map(x => x.total_venda).reduce((a, b) => parseInt(a) + parseInt(b), 0)
    const Reais = parseInt(Faturado).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    const QuantidadeTotal = data.map(x => x).length;
    

    // const handleLogout = () => {
    //     logout()

    // };
    
///// Modal para Confirmação de Exclusão de venda 


    return (
        <div className="container">
            <img src={IMGFastCheckout} id="LogoFast"/>
            <div className="Diarios">
                <div id="usuario">
                    <p className="title"><strong>Usuário</strong></p> 
                    <p className="response">{user}</p>
                </div>    
                <div id="totalvendas">
                    <p className="title"><strong>Faturamento</strong></p>
                    <p className="response">{Reais}</p>
                </div>
                <div id="quantvendas">
                    <p className="title"><strong>Vendas</strong></p>
                    <p className="response">{QuantidadeTotal}</p>
                </div>
            </div>
            <div className="menu">
            <IconButton id="addvenda" aria-label="add to shopping cart" size="large">
                <AddShoppingCartIcon fontSize="inherit"/>
            </IconButton>
            </div>
            <div className="vendas-container">
                {data.map((venda) => (
                    <div className="view-venda" key={venda.ordem}>
                        <p><strong>Ordem: </strong>{venda.ordem}</p>
                        <p><strong>CPF: </strong>{(venda.nome_cliente).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</p>
                        <p><strong>Valor: </strong>{parseInt(venda.total_venda).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                        <BasicModal value={venda.ordem} /> 
                </div>
                ))}
            
            </div>
            
        </div>
    );
};

export default HomePage;