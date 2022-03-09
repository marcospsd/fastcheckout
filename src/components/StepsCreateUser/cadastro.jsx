import React from 'react'
import './cadastro.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const CadastroForm = ({ formData, setForm, navigation }) => {
    console.log(formData)

     
    return (
        <div className='container-cadastro'>
            <p id='cadastro-tittle'>Cadastro</p>
            <div className="cadastro-fields">
                <TextField 
                id="outlined-basic" 
                label="Nome Completo" 
                variant="outlined" 
                onChange={setForm}
                value={formData.nome}
                />
                <TextField 
                id="outlined-basic" 
                label="CPF" 
                variant="outlined" 
                />
                <TextField 
                id="outlined-basic" 
                label="E-Mail" 
                variant="outlined" 
                />            
                <TextField 
                id="outlined-basic" 
                label="Telefone" 
                variant="outlined" 
                />
            </div>
                <div className="cadastro-buttons"> 
                    <Button variant="contained" onClick={() => navigation.previous()}>Back</Button>
                    <Button variant="contained" onClick={() => navigation.next()}>Next</Button>
                </div>


        </div>
    )
}