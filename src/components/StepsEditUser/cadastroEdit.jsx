import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputMask from 'react-input-mask';
import { api } from '../../services/api';
import { cpf as CPFValidated } from 'cpf-cnpj-validator';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export const CadastroForm = ({ formData, setForm, navigation, userbanco, setUserBanco }) => {
    const [ nome, setNome ] = useState(formData.nome)
    const [ cpf, setCPF ] = useState(formData.cpf)
    const [ telefone, setTelefone ] = useState(formData.telefone)
    const [ email, setEmail ] = useState(formData.email)

    const [ open, setOpen] = useState(false)
    const [ alert, setAlert] = useState('')



    const BuscaCPF = (ev) => {
        const {value} = ev.target
        const data = value?.replace(/[^0-9]/g, '')
        if ( data.length !== 11) {
            return;
        } else {
            api.get(`/api/v2/cliente/${data}/`)
            .then((res) => {
                setNome(res.data.nome)
                setEmail(res.data.email)
                setTelefone(res.data.telefone)
                setUserBanco(true)
            
            })
            .catch((error) => {
                setUserBanco(false)
                return;
            })
        }

    }

    // function CriarUsuario(nome, cpf, email, telefone) {
    //     api.post('/api/v2/cliente/', { cpf, nome, email, telefone })
        
    // }

    function ValidatedCPF(cpf) {
        const cpfdata = cpf?.replace(/[^0-9]/g, '')
        if (cpfdata === '99999999999') {
            return true;
        } else {
            if (cpfdata.length === 11) {
            return CPFValidated.isValid(cpfdata)
            }
        }
        return true
    }



    return (
        <div className='container-cadastro'>
            <p id='cadastro-tittle'>Cadastro</p>
            <div className="cadastro-fields">

            <InputMask
                mask="999.999.999-99"
                onBlur={(e) => {
                    if (ValidatedCPF(e.target.value) === true) {
                        BuscaCPF(e)
                    } else {
                        setAlert("CPF Inválido !")
                        setOpen(true)
                    }}}
                onChange={ (e) => setCPF(e.target.value) }
                value={cpf}
                maskChar=" "
                name="cpf"
                >
                { () => <TextField
                id="text-field-cpf" 
                label="CPF" 
                variant="outlined"
                autoComplete='off'
                name="cpf"
                type="tel"
                required
              
                /> }
                </InputMask>

                <TextField
                id="text-field-cpf" 
                label="Nome Completo" 
                name="nome"
                variant="outlined"
                autoComplete='off'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                />
            
                
                <TextField 
                id="text-field-email" 
                label="E-Mail" 
                variant="outlined"
                name="email"
                onChange={(e) => setEmail(e.target.value) } 
                autoComplete='off'
                value={email}
                />  

                <InputMask
                mask="(99) 99999-9999"
                onChange={ (e) => setTelefone(e.target.value) }
                value={telefone}
                maskChar=" "
                name="telefone"
                >
                { () => <TextField
                id="text-field-telefone" 
                label="Telefone" 
                variant="outlined"
                autoComplete='off'
                name="telefone"   
                type="tel"           
                /> }
                </InputMask>

                <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
                    <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '90%' }}>
                        {alert}
                    </Alert>
                </Snackbar>

            </div>
                <div className="cadastro-buttons"> 
                    <Button id="next" variant="contained" onClick={() => {
                        if (cpf === '') {
                            setAlert('CPF Não pode ser vazio !')
                            setOpen(true)
                            return;
                        }
                        if (ValidatedCPF(cpf) === false) {
                            setAlert('CPF inválido !')
                            setOpen(true)
                            return;
                        }
                        if (nome === '') {
                            setAlert('Nome não pode ser vazio !')
                            setOpen(true)
                            return;
                        }
                        setForm({...formData,
                            nome: nome,
                            cpf: cpf.replace(/[^0-9]/g, ''),
                            email: email,
                            telefone: telefone,
                        })
                        
                        if (cpf.replace(/[^0-9]/g, '') === '99999999999') {
                            navigation.next()
                        } else {
                            if (userbanco === false) {
                                api.post('/api/v2/cliente/', { cpf: cpf, nome: nome, email: email, telefone: telefone })
                                .then((res) => {
                                    setUserBanco(true)
                                    navigation.next() 
                                })
                                .catch((err) => {
                                    setAlert("Erro de requisição, verifique o E-mail se possui dados inválidos.")
                                    setOpen(true)
                                })
                            } else {
                                api.patch(`/api/v2/cliente/${cpf.replace(/[^0-9]/g, '')}/`, { nome: nome, email: email, telefone: telefone})
                                .then((res) => {
                                    navigation.next()   
                                })
                                .catch((err) => {
                                    setAlert("Erro de requisição, verifique o E-mail se possui dados inválidos.")
                                    setOpen(true)
                                })
                            }
                        }
                        
                    }}>Próximo</Button>
                </div>

        </div>
    )
}