import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import _ from 'lodash';




const ChartsBarra =  ({data}) => {
    const [ grafico, setGrafico] = useState()

    const LoadData = (data) => {
        const values = _.groupBy(data, (value) => {
            return value.corpovenda.map((ven) => (
                ven.descripro.substring(0,7)
        ))
        })

        const result = _.map(values, (value, key) => [
            key,
            _.countBy(values[key])
        ])

        console.log(result)
        return setGrafico([
            ["Dados 1", "Total Vendido"],
            ...result,
        ])
    }

    useEffect(() => {
        LoadData(data)
    }, [])
    
    return (

        <div className="container-charts">
            <Chart 
            chartType="ColumnChart" 
            data={grafico} />
        </div>

        )
}

export default ChartsBarra;