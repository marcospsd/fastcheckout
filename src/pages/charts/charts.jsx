import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';

import './charts.css'



const ChartsView = () => {
    const { data } = useFetch('/api/v2/venda/')

    if (!data) {
        return <p>carregando ...</p>
    }

    return (

        <div className="container">
        </div>
        
        )
}

export default ChartsView