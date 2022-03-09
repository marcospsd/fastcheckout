import React from 'react'

export const ProdutosForm = ({ formData, setForm, navigation }) => {
    return (
        <div>
            <h1>Produtos</h1>
            <button onClick={() => navigation.previous()}></button>
            <button onClick={() => navigation.next() }>Next</button>
        </div>
    )
}