import * as React from 'react';
import { AuthContext } from "../../contexts/auth";
import { useFetch } from "../../hooks/useFetch";
import IMGFastCheckout from "../../statics/FAST.png"
import "./home.css"
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import BasicModal from '../../components/Modal/ModalViewVenda'
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { CircularProgress } from "@mui/material";


import ComprovanteVenda from '../../reports/venda';
import { api, deleteVendas } from '../../services/api';


import LogoutIcon from '@mui/icons-material/Logout';
import ModalCreate from '../../components/Modal/ModalCreateVenda';




const HomePage = () => {
    const [open, setOpen] = React.useState(false);
    const openModal = () => { setOpen(prev => !prev)}
    const user = ((localStorage.getItem('nome')).replace('"', '').replace('"', '').toUpperCase()).toString()
    const [search, setSearch] = React.useState("");
    const { data, mutate } = useFetch('/api/v2/venda/');
    const { logout } = React.useContext(AuthContext);
    const handleLogout = () => {
        logout()

    };
    
    if (!data) {
        return (
            <>

            <CircularProgress />

            <IconButton onClick={() => handleLogout()}><LogoutIcon/></IconButton>
            
            </>
        )

    }

    const AcaoDeletar = async (id) => {
            await api.delete(`/api/v2/venda/${id}`)
            const updatedata = data.filter((x) => x.ordem !== id)
            mutate(updatedata, false)

        }
  
        
      const AprovarCompra = async (venda) => {
        await api.put(`/api/v2/venda/${venda.ordem}/`, {...venda, status: 'F'})
        .then((res) => ComprovanteVenda(venda))
        const updatedata = data.map((x) => {
            if (x.ordem == venda.ordem) {
                return { ...x, status: 'F'}
            } else {return x}
        })
        
        mutate(updatedata, false) 
  
      }
  
      const RetornaCompra = async (venda) => {
        await api.put(`/api/v2/venda/${venda.ordem}/`, {...venda, status: 'P'})
        const rev = data.map((x) => {
            if (x.ordem === venda.ordem) {
                return { ...x, status: 'P'}
            } else {return x}
        })
        mutate(rev, false) 
        
  
      }

      const CriarVenda = (data) => {
          mutate()
      }
    

//// Conversão para Reais dos dados da Api    
    const Faturado = data.map(x => x.total_venda).reduce((a, b) => parseInt(a) + parseInt(b), 0)
    const Reais = parseInt(Faturado).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    const QuantidadeTotal = data.map(x => x).length;
    const statusvenda = (id) => {
        switch (id) {
            case "P":
                return "Pendente"
            case "F":
                return "Finalizado"
        }
    }

   


    return (
        <div className="container">
            <img src={IMGFastCheckout} id="LogoFast"/>
            <IconButton onClick={() => handleLogout()} id="Sair"><LogoutIcon/></IconButton>
            <div className="Diarios">
                <div id="usuario">
                    <p className="title"><strong>Usuário</strong></p> 
                    <p className="response">{user.split(' ').slice(0, 2).join(' ')}</p>
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
                <IconButton id="addvenda" aria-label="add to shopping cart" size="large" onClick={openModal}><ModalCreate/>
                    <AddShoppingCartIcon fontSize="inherit"/>
                </IconButton>
                <ModalCreate open={open} criarvenda={CriarVenda} setOpen={setOpen}></ModalCreate>
            </div>
            <TextField id="searchinput" label="Pesquise pela Ordem/Nome" variant="outlined"value={search} onChange={(event) => { setSearch(event.target.value) }}
             InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                ),
                }} />
            <div className="vendas-container">
                {data.filter(
                    (venda) => {
                        if (search == "") {
                            return venda
                        } else if (venda.ordem.toString().includes(search)) {
                            return venda
                        } else if ((venda.nome.toLowerCase().includes(search.toLowerCase()))) {
                            return venda
                         } else if ((venda.cpf.includes(search))) {
                            return venda
                         }
                    }
                ).map((venda) => (
                    <div className="view-venda" key={venda.ordem} id={venda.status}>
                        <p><strong>Ordem: </strong>{venda.ordem}</p>
                        <p><strong>CPF: </strong>{(venda.cpf).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</p>
                        <p><strong>Nome: </strong>{venda.nome}</p>
                        <div className="row">
                            <div className="col" id='valor'>
                            <label><strong>Valor: </strong>{parseInt(venda.total_venda).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</label>
                                </div>
                            <div className="col" id='status'>
                            <label><strong>Status: </strong>{statusvenda(venda.status)}</label>
                                </div>
                        </div>
                        
                        <BasicModal 
                                value={venda}
                                acaodeletar={AcaoDeletar}
                                aprovarcompra={AprovarCompra}
                                retornarcompra={RetornaCompra}
                                criarvenda={CriarVenda}
                                
                        /> 
                        
                </div>
                ))}
               
            </div>
            
        </div>
    );
};

export default HomePage;