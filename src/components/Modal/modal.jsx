import * as React from 'react';
import "./modal.css"
import Box from '@mui/material/Box';
import IconButton  from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import { useFetch } from '../../hooks/useFetch';
import { deleteVendas } from "../../services/api";




  const BasicModal = () => {
    const { data, mutate } = useFetch(`api/v2/venda/1`)
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);


  //   function AcaoDeletar (id) {
  //     if ( window.confirm("Deseja deletar essa venda ?")) {
  //         deleteVendas(id);
  //         const refreshVendas = data.filter((venda) => venda.ordem !== id)
  //         mutate(refreshVendas, false)
  //     }
  // }


    return (
      <div>
          <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          { data.map((venda) => (
            <Box id="box-view-itens" key={venda.ordem}>
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
                    <p><strong>Codigo: </strong> {corpovenda.codpro}</p>
                    <p><strong>Descricao: </strong> Blablabla</p>
                    <p><strong>De:</strong>{corpovenda.valor_unitsis}</p>
                    <p><strong>Por: </strong>{corpovenda.valor_unitpro}</p>
                    <p><strong>Quantidade: </strong>{corpovenda.quantidade}</p>
                </div>
            ))}
                {/* <IconButton aria-label="delete" size="large" id="excluir" onClick={() => AcaoDeletar(venda.ordem)}>
                    <DeleteIcon />
                </IconButton> */}
                </Box>
          ))}
          </Modal>
      </div>
    );
}

export default BasicModal;