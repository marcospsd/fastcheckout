import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputMask from 'react-input-mask';
import { api } from '../../services/api';
import { cpf as CPFValidated } from 'cpf-cnpj-validator';
import { ConstructionOutlined } from '@mui/icons-material';



export const CadastroForm = ({ formData, setForm, navigation }) => {
    const [ nome, setNome ] = useState(formData.nome)
    const [ cpf, setCPF ] = useState(formData.cpf)
    const [ telefone, setTelefone ] = useState(formData.telefone)
    const [ email, setEmail ] = useState(formData.email)
    const [ userbanco, setUserBanco] = useState(false)



    const BuscaCPF = (ev) => {
        const {value} = ev.target
        const data = value?.replace(/[^0-9]/g, '')
        if ( data.length !== 11) {
            return;
        }
        api.get(`/api/v2/cliente/${data}/`)
            .then((res) => {
                setNome(res.data.nome)
                setEmail(res.data.email)
                setTelefone(res.data.telefone)
                setUserBanco(true)
            
            })
            .catch((error) => {
                return;
            })
    }

    function ValidatedUser(nome, cpf, email, telefone) {
        api.post('/api/v2/cliente/', { cpf, nome, email, telefone })
        
    }

    function ValidatedCPF(cpf) {
        const cepeefe = cpf?.replace(/[^0-9]/g, '')
        if (cpf === '99999999999') {
            return true;
        } else if (cpf.length === 14) {
            
            return CPFValidated.isValid(cepeefe)
        }
        return true;
    }

    console.log(formData)
    return (
        <div className='container-cadastro'>
            <p id='cadastro-tittle'>Cadastro</p>
            <div className="cadastro-fields">

            <InputMask
                mask="999.999.999-99"
                onBlur={(e) => {
                    if (ValidatedCPF(e.target.value) == true) {
                        BuscaCPF(e)
                    } else {
                        window.alert("CPF Invalido !")
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
                onChange={(e) => setTelefone(e.target.value) }
                maskChar=" "
                name="telefone"
                value={telefone}
                >
                { () => <TextField
                id="text-field-telefone" 
                label="Telefone" 
                variant="outlined"
                autoComplete='off'
                name="telefone"
                /> }
                </InputMask>

            </div>
                <div className="cadastro-buttons"> 
                    <Button id="next"variant="contained" onClick={() => {
                        setForm({...formData,
                            nome: nome,
                            cpf: cpf,
                            email: email,
                            telefone: telefone,
                        })
                        ValidatedUser(nome, cpf, email, telefone)
                        navigation.next()
                    }}>Proximo</Button>
                </div>

        </div>
    )
}