import React, { useState, useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import ChartsBarra from '../../components/Charts/Barras'
import './charts.css'



const ChartsView = () => {
    const { data } = useFetch('/api/v2/venda/')
    
    if (!data) {
        return <p>carregando ...</p>
    }

    return (
        <div className="container-charts">
            <ChartsBarra data={data}/>
        </div>
        
       
        )
}

export default ChartsView