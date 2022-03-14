import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton  from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { api } from '../../services/api';

export const ProdutosForm = ({ formData, setForm, navigation }) => {
    return (
        <div className='container-products'>
            <p>Produtos</p>
            <div className='label-products'>
                <div className='col-search-products'>
                <TextField label='Pesquise pelo Codigo ou Descricao'/>
                </div>
                <div className='col-products'>
                <TextField label='Codigo' disabled/>
                <TextField label='Descricao' disabled/>
                </div>
                <div className='col-products'>
                <TextField label='Valor Sistema' disabled/>
                <TextField label='Valor Promoção' disabled/>
                </div>
                
            </div>
            <Button id='back' variant="contained">Adicionar</Button>
            <p></p>
            <div className='card-products'>
                <label id='Codigo'><strong>Codigo: </strong>11122233</label>
                <label id='Descricao'><strong>Descricao: </strong>Oc Rban XXXXX xXXXX </label>
                <label id='Valor Sistema'><strong>Valor Sistema: </strong>R$ 1520,00</label>
                <label id='Valor Promoção'><strong>Valor Promoção: </strong>R$ 600,00</label>
                <IconButton id='delete'><DeleteIcon/></IconButton>
            </div>
            <div className='buttons-products'>
                <Button id='back' onClick={() => navigation.previous()} variant="contained">Back</Button>
                <Button id='next' onClick={() => navigation.next() } variant="contained">Next</Button>
            </div>
        </div>
    )
}