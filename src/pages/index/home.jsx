import * as React from 'react';
import { AuthContext } from "../../contexts/auth";
import { deleteVendas } from "../../services/api";
import { useFetch, useDados } from "../../hooks/useFetch";
import IMGFastCheckout from "../../statics/FAST.png"
import "./home.css"

import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { CircularProgress } from "@mui/material";
import Box from '@mui/material/Box';
import ArticleIcon from '@mui/icons-material/Article';
import Modal from '@mui/material/Modal';


const HomePage = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
     
    function AcaoDeletar (id) {
        if ( window.confirm("Deseja deletar essa venda ?")) {
            deleteVendas(id);
            const refreshVendas = data.filter((venda) => venda.ordem !== id)
            mutate(refreshVendas, false)
        }
    }


///// Modal de Visualização de dados


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
                        <IconButton onClick={handleOpen} id="excluir"><ArticleIcon/></IconButton>
                    
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                key={venda.ordem}
                >
                    <Box id="box-view-itens">
                    <p><strong>Ordem: </strong>{venda.ordem}</p>
                    <p><strong>CPF: </strong>{(venda.nome_cliente).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</p>
                    <p><strong>Total da Venda: </strong>{parseInt(venda.total_venda).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</p>
                    {venda.formavenda.map((formpag) => (
                        <div className='formavenda-css' key={formpag.id}>
                        <p><strong>Tipo: </strong>{formpag.forma} || <strong>Parcelas: </strong>{formpag.parcelas} || <strong>Valor: </strong>{formpag.valor}</p>
                        </div>
                    ))}
                    {venda.corpovenda.map((corpovenda) => (
                        <div className='corpovenda-css' key={corpovenda.id}>
                            <p><strong> Codigo:</strong> {corpovenda.codpro}</p>
                            <p><strong>Descricao: </strong> Blablabla</p>
                            <p><strong>De:</strong>{corpovenda.valor_unitsis}</p>
                            <p><strong>Por: </strong>{corpovenda.valor_unitpro}</p>
                            <p><strong>Quantidade: </strong>{corpovenda.quantidade}</p>
                        </div>
                    ))}
                    <IconButton aria-label="delete" size="large" id="excluir" onClick={() => AcaoDeletar(venda.ordem)}>
                        <DeleteIcon />
                    </IconButton>
                    </Box>
                </Modal>
                </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;