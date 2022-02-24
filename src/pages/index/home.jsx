import React, { useContext} from "react";
import { AuthContext } from "../../contexts/auth";
import { deleteVendas } from "../../services/api";
import { useFetch } from "../../hooks/useFetch";
import IMGFastCheckout from "../../statics/FAST.png"
import "./home.css"

import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';


const HomePage = () => {
    const user = String(localStorage.getItem('nome'))
    const { data, mutate } = useFetch('/api/v2/venda/');
    const { logout } = useContext(AuthContext);
    if (!data) {
        return <p>loading ...</p>
    }


////// Conversão para Reais dos dados da Api    
    const Faturado = data.map(x => x.total_venda).reduce((a, b) => a+b, 0)
    const Reais = parseInt(Faturado).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    const QuantidadeTotal = data.map(x => x).length;
    console.log(QuantidadeTotal)

    // const handleLogout = () => {
    //     logout()

    // };
    
///// Modal para Confirmação de Exclusão de venda 
    const ModalVenda = (id) => {
            if ( window.confirm("Deseja excluir essa venda ?")) {
                deleteVendas(id);

                const deletevideos = {
                    vendas: data.filter((venda) => venda.ordem !== id)
                };
                
                mutate(deletevideos, false)

            }
    };

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
                {data?.map((venda) => (
                    <div className="view-venda" key={venda.ordem}>
                        <p><strong>Ordem: </strong>{venda.ordem}</p>
                        <p><strong>CPF: </strong>{venda.cpf}</p>
                        <p><strong>Valor: </strong>{parseInt(venda.total_venda).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                        <IconButton aria-label="delete" size="small" id="excluir" onClick={() => ModalVenda(venda.ordem)}>
                            <DeleteIcon />
                        </IconButton>
                        <div className="itens">
                        </div>
                    </div>
                    
                ))}
            </div>
        </div>
    );
};

export default HomePage;