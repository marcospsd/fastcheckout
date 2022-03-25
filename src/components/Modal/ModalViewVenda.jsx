import * as React from 'react';
import "./ModalViewVenda.css"

import Box from '@mui/material/Box';
import IconButton  from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ModalEdit from './ModalEditVenda'





  const BasicModal = (props) => {
    const data = props.value
    const criarvenda = props.criarvenda
    const [open, setOpen] = React.useState(false);
    const [openedit, setOpenEdit] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const { mutate } = useSWRConfig();
  
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

  const numero = (n) => {
    if (n) {
      return n.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    }

  }

    function ButtonCorreto(data) {
      switch (data.status) {
        case "P":
        return (
          <>
          <IconButton onClick={() => {
            setOpenEdit(true)
            }}><EditIcon/></IconButton>
          

          <IconButton onClick={ async () => {
            props.aprovarcompra(data)
            handleClose()
            

          }}><FactCheckIcon/></IconButton>

          <IconButton onClick={() => {
              handleClose()
              props.acaodeletar(data.ordem)
                
              }} id='delete'><DeleteIcon/></IconButton>

          <IconButton onClick={() => setOpen(false)}><CloseIcon/></IconButton>
          </>
        )
        
        
       
        case "F":
          return (
            <>
            <IconButton onClick={() => {
              handleClose()
              props.retornarcompra(data)}
              }><SettingsBackupRestoreIcon /></IconButton>
           
            <IconButton onClick={() => {
                handleClose()
                props.comprovantevenda(data)
            }}><PrintIcon/></IconButton>

            <IconButton onClick={() => setOpen(false)}><CloseIcon/></IconButton>


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
              <div className="row">
                <div className='col'>
                  <label><strong>Ordem: </strong>{data.ordem}</label>
                  <label><strong>CPF: </strong>{(data.cpf).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</label>
            
                </div>
                <div className='col'>
                  <label><strong>Vendedor: </strong> {data.vendedor}</label>
                  <label><strong>Total da Venda: </strong>{parseInt(data.total_venda).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</label>
                </div>
              </div>
              <label className='dadoscli'><strong>Nome: </strong> {data.nome}</label>
              <label className='dadoscli'><strong>E-mail: </strong> {data.email}</label>
              <label className='dadoscli' id="dadosclifinal"><strong>Telefone: </strong> {numero(data.telefone)}</label>
        
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
                    <td>Código</td>
                    <td>Descrição</td>
                    <td>Valor</td>
                    
                </tr>
              {data.corpovenda.map((corpovenda) => (
                <tr key={corpovenda.id}>
                <td>{corpovenda.codpro}</td>
                <td>{corpovenda.descripro}</td>
                <td>{parseInt(corpovenda.valor_unitpro).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</td>
                </tr>
              ))}
              </tbody>
              </table>
            </div>
            <div id='opcoes'>
              { ButtonCorreto(data) }
              <ModalEdit open={openedit} setOpenEdit={setOpenEdit} openedit={openedit} value={data} criarvenda={criarvenda}/>
            </div>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;