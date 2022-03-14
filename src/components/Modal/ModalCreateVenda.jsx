import React, {useState} from 'react';
import './ModalCreateVenda.css'
import { useForm, useStep } from 'react-hooks-helper';
import { CadastroForm } from '../StepsCreateUser/cadastro';
import { ProdutosForm } from '../StepsCreateUser/produtos';
import { FormaPagForm } from '../StepsCreateUser/formapag';
import { PreviewForm } from '../StepsCreateUser/preview'

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const steps = [
    { id: 'cadastro' },
    { id: 'produtos' },
    { id: 'formapag' },
    { id: 'preview' },
]

const state = {
    cpf: "",
    nome: "",
    email: "",
    telefone: "",
    total_venda: "",
    corpovenda: [],
    formavenda: [],
    status: "P",
}
const ModalCreate = ({open, setOpen}) => {
    const codvend = (localStorage.getItem('codvend')).replace('"', '').replace('"', '')
    const nomevendedor = (localStorage.getItem('nome')).replace('"', '').replace('"', '').toLocaleUpperCase()
    const [formData, setForm] = useState({ ...state, codvend: codvend, nomevend: nomevendedor })
    const { step, navigation } = useStep({
        steps, initialStep: 0
    })
    
    const props = { formData, setForm, navigation }
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
                        <PreviewForm { ...props }/>
                    </Box>
                </Modal>
                 : null }
                </>
                )
        
    }

}

export default ModalCreate;