import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputMask from 'react-input-mask';



export const CadastroForm = ({ formData, setForm, navigation }) => {
    const { nome, cpf, telefone, email } = formData;

    console.log(formData)
    return (
        <div className='container-cadastro'>
            <p id='cadastro-tittle'>Cadastro</p>
            <div className="cadastro-fields">

                <TextField
                id="text-field-cpf" 
                label="Nome Completo" 
                name="nome"
                onChange={setForm}
                variant="outlined"
                autoComplete='off'
                value={nome}
                required
                />
                
                <InputMask
                mask="999.999.999-99"
                onChange={setForm}
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
                id="text-field-email" 
                label="E-Mail" 
                variant="outlined"
                name="email"
                onChange={setForm} 
                autoComplete='off'
                value={email}
                />  
                <InputMask
                mask="(99) 99999-9999"
                onChange={setForm}
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
                    <Button id="next"variant="contained" onClick={() => navigation.next()}>Proximo</Button>
                </div>

        </div>
    )
}