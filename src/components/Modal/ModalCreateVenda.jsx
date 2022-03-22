import React, {useState} from 'react';
import './ModalCreateVenda.css'
import { useForm, useStep } from 'react-hooks-helper';
import { CadastroForm } from '../StepsCreateUser/cadastro';
import { ProdutosForm } from '../StepsCreateUser/produtos';
import { FormaPagForm } from '../StepsCreateUser/formapag';
import { PreviewForm } from '../StepsCreateUser/preview';
import IconButton  from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const steps = [
    { id: 'cadastro' },
    { id: 'produtos' },
    { id: 'formapag' },
    { id: 'preview' },
]


const ModalCreate = ({open, setOpen, criarvenda}) => {
    const createvenda = (venda) => criarvenda(venda)
    const codvend = (localStorage.getItem('codvend')).replace('"', '').replace('"', '')
    const nomevendedor = (localStorage.getItem('nome')).replace('"', '').replace('"', '').toLocaleUpperCase()
    const state = {
        cpf: "",
        nome: "",
        email: "",
        telefone: "",
        total_venda: "",
        corpovenda: [],
        formavenda: [],
        status: "P",
        vendedor: codvend,
        nomevendedor: nomevendedor,
    }
    const [formData, setForm] = useState(state)
    const { step, navigation } = useStep({
        steps, initialStep: 0
    })

    function fecharModal() {
        setOpen(false)
    }

    function CloseModal() {
        setOpen(false)
        setForm(state)
    }
    
    const props = { formData, setForm, navigation, fecharModal, state, createvenda }
    switch(step.id) {
        case 'cadastro':
            return (
                <>
                {open ? 
                <Modal
                        open={open}
                        onClose={() => setOpen(false)}
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
                {open ? 
                <Modal
                        open={open}
                        onClose={() => setOpen(false)}
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
                {open ? 
                <Modal
                        open={open}
                        onClose={() => setOpen(false)}
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
                {open ? 
                <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                    <Box
                        id='box-create-venda'
                    >
                        <IconButton id="closeitem" onClick={CloseModal}><CloseIcon/></IconButton>
                        <PreviewForm { ...props } criarvenda={createvenda}/>
                    </Box>
                </Modal>
                 : null }
                </>
                )
        
    }

}

export default ModalCreate;