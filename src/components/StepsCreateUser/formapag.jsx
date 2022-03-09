import React from 'react'

export const FormaPagForm = ({ formData, setForm, navigation }) => {
    return (
        <div>
            <h1>Forma de Pagamento</h1>
            <button onClick={() => navigation.previous()}></button>
            <button onClick={() => navigation.next() }>Next</button>
        </div>
    )
}