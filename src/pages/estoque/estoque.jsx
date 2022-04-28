import React, {useState} from 'react'
import { useFetch } from "../../hooks/useFetch";
import IconButton from '@mui/material/IconButton';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import './estoque.css'
import { api } from '../../services/api';


const EstoqueView = () => {
    const { data, mutate } = useFetch('/api/v2/saidaprodutos/')

    if (!data) {
        return <p>Carregando ...</p>
    }
    const CheckedItem = async(item) => {
        const response = await api.patch(`/api/v2/saidaprodutos/${item}/`, { visualizado: true})
        if (response.status === 200){
            const newItem = data.filter((x) => x.id !== item)
            mutate(newItem, false)
        }
    }


    return (
        <div className='container'>
            <h2>Produtos para Reposição</h2>
            {data.length !== 0 ? data.map((produto) => (
                <div className="view-venda" key={produto.id}>
                    <p><strong>Ordem: </strong>{produto.venda}</p>
                    <p><strong>Produto: </strong>{produto.descri}</p>
                    <IconButton id='fascticon' onClick={() => CheckedItem(produto.id)}>
                        <FactCheckIcon/>
                    </IconButton>
                </div>
            )) : <p>Não existem produtos para reposição.</p>}
        </div>
    )
}

export default EstoqueView;