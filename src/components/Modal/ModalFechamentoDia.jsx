import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton  from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useFetch} from '../../hooks/useFetch'
import './ModalFechamentoDia.css'


const ModalFechamento = ({ openfech, setOpenFech}) => {
    const {data} = useFetch(`/api/v2/formavenda/`)

    console.log(data)


    return (
        <Modal
                      open={openfech}
                      onClose={() => setOpenFech(false)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description">
                  <Box
                      id='box-fechamento'
                  >
                      <p>Olá Mundo</p>
                      <IconButton id="closeitem" onClick={() => {setOpenFech(false)}}><CloseIcon/></IconButton>
                  </Box>
              </Modal>
    )
}

export default ModalFechamento;