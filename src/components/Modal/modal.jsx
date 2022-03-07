import * as React from 'react';
import "./modal.css"
import ComprovanteVenda from '../../reports/venda'
import Box from '@mui/material/Box';
import IconButton  from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import {mutate} from 'swr'

import { api, deleteVendas } from '../../services/api';
import axios from 'axios';


  const BasicModal = (id) => {
    const data = id.value
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (!data) {
      return <button onClick={handleOpen}>Open modal</button>
    }

    const formapagamento = (id) => {
      switch (id) {
          case "DH":
              return "Dinheiro"
          case "CC":
              return "C. Crédito"
          case "CD":
              return "C. Débito"
          case "DP":
              return "PIX"
          }
  }

    
    function AcaoDeletar (id) {
      if ( window.confirm("Deseja deletar essa venda ?")) {
          deleteVendas(id);
          mutate('/api/v2/venda/', false);
      }
  }

    function AprovarCompra (data) {
      const res =  api.put(`/api/v2/venda/${data.ordem}/`, {...data, status: 'F'})
      mutate('/api/v2/venda/', false)
      ComprovanteVenda(data)
    }

    function RetornaCompra (data) {
      const res = api.put(`/api/v2/venda/${data.ordem}/`, {...data, status: 'P'})
      mutate('/api/v2/venda/', false)
      handleClose()
    }

    function ButtonCorreto(data) {
      switch (data.status) {
        case "P":
        return (
          <>
          <IconButton><EditIcon/></IconButton>

          <IconButton onClick={() => AprovarCompra(data)}><FactCheckIcon/></IconButton>

          <IconButton onClick={() => {
                AcaoDeletar(data.ordem)
                handleClose()
              }} id='delete'><DeleteIcon/></IconButton>
          </>
        )
        
        
       
        case "F":
          return (
            <>
            <IconButton onClick={() => RetornaCompra(data)}><SettingsBackupRestoreIcon /></IconButton>
           
            <IconButton onClick={() => ComprovanteVenda(data)}><PrintIcon/></IconButton>
            </>
          ) 
          
      }


    }

    return (
      <div>
      <IconButton onClick={handleOpen} id='excluir'><ArticleIcon /></IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box id='box-view-itens'>
            <div id='tittle-modal'>
              <label><strong>RESUMO DA VENDA</strong></label>
            </div>
            <div id='dadosvenda'>
              <div className='col'>
                <label><strong>Ordem: </strong> {data.ordem}</label>
                <label><strong>CPF: </strong> {(data.nome_cliente).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</label>
              </div>
              <div className='col'>
              <label><strong>Vendedor: </strong> {data.vendedor}</label>
              <label><strong>Total da Venda: </strong> {parseInt(data.total_venda).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</label>
              </div>
            </div>
            <div id='formadepagamento'>
            <p><strong>FORMA DE PAGAMENTO</strong></p>
              <table>
                <tbody>
                <tr id='formatitle'>
                  <td>Forma de Pagamento</td>
                  <td>Parcelas</td>
                  <td>Valor</td>
                </tr>
              {data.formavenda.map((forma) => (
                <tr key={forma.id}>
                  <td className='formaconteudo' >{formapagamento(forma.forma)}</td>
                  <td className='formaconteudo' >{forma.parcelas}</td>
                  <td className='formaconteudo' >{parseInt(forma.valor).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</td>
                </tr>
              ))}
              </tbody>
              </table>
            </div>
            <div id='corpovenda'>
              <p><strong>PRODUTOS</strong></p>
              <table>
                <tbody>
                <tr id='corpotittle'>
                    <td>Codigo</td>
                    <td>Quantidade</td>
                    <td>Valor Unitário</td>
                    <td>Valor Final</td>
                    
                </tr>
              {data.corpovenda.map((corpovenda) => (
                <tr key={corpovenda.id}>
                <td>{corpovenda.codpro}</td>
                <td>{corpovenda.quantidade}</td>
                <td>{parseInt(corpovenda.valor_unitsis).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</td>
                <td>{parseInt(corpovenda.valor_unitpro).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</td>
                </tr>
              ))}
              </tbody>
              </table>
            </div>
            <div id='opcoes'>
              
              { ButtonCorreto(data) }

            </div>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;