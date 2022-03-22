import React, {useState} from 'react';
import './ModalCreateVenda.css'
import { useForm, useStep } from 'react-hooks-helper';
import { CadastroForm } from '../StepsEditUser/cadastroEdit';
import { ProdutosForm } from '../StepsEditUser/produtosEdit';
import { FormaPagForm } from '../StepsEditUser/formapagEdit';
import { PreviewForm } from '../StepsEditUser/previewEdit';
import IconButton  from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { api } from '../../services/api';


const steps = [
  { id: 'cadastro' },
  { id: 'produtos' },
  { id: 'formapag' },
  { id: 'preview' },
]

 const ModalEdit = ({openedit, setOpenEdit, value, criarvenda}) => {
  const codvend = (localStorage.getItem('codvend')).replace('"', '').replace('"', '')
  const nomevendedor = (localStorage.getItem('nome')).replace('"', '').replace('"', '').toLocaleUpperCase()
  const [formData, setForm] = useState(value)
  const { step, navigation } = useStep({
      steps, initialStep: 0
  })


  function fecharModal() {
    setOpenEdit(false)
    setForm()
  }

  function CloseModal() {
    setOpenEdit(false)
      setForm(value)
  }

  const props = { formData, setForm, navigation, fecharModal, value, criarvenda}
  switch(step.id) {
      case 'cadastro':
          return (
              <>
              {openedit ? 
              <Modal
                      open={openedit}
                      onClose={() => setOpenEdit(false)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description">
                  <Box
                      id='box-create-venda'
                  >
                      <IconButton id="closeitem" onClick={CloseModal}><CloseIcon/></IconButton>
                      <CadastroForm { ...props }/>
                  </Box>
              </Modal>
               : null }
              </>
              )
      case 'produtos':
          return (
              <>
              {openedit ? 
              <Modal
                      open={openedit}
                      onClose={() => setOpenEdit(false)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description">
                  <Box
                      id='box-create-venda'
                  >
                      <IconButton id="closeitem" onClick={CloseModal}><CloseIcon/></IconButton>
                      <ProdutosForm { ...props }/>
                  </Box>
              </Modal>
               : null }
              </>
              )
      case 'formapag':
          return (
              <>
              {openedit ? 
              <Modal
                      open={openedit}
                      onClose={() => setOpenEdit(false)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description">
                  <Box
                      id='box-create-venda'
                  >
                      <IconButton id="closeitem" onClick={CloseModal}><CloseIcon/></IconButton>
                      <FormaPagForm { ...props }/>
                  </Box>
              </Modal>
               : null }
              </>
              )
      case 'preview':
          return (
              <>
              {openedit ? 
              <Modal
                      open={openedit}
                      onClose={() => setOpenEdit(false)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description">
                  <Box
                      id='box-create-venda'
                  >
                      <IconButton id="closeitem" onClick={CloseModal}><CloseIcon/></IconButton>
                      <PreviewForm { ...props }/>
                  </Box>
              </Modal>
               : null }
              </>
              )
      
  }

}

export default ModalEdit