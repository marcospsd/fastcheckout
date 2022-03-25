import React, {useEffect} from 'react'
import LeitorCODBAR from '../../components/CodBar/codbar'
import Quagga from '@ericblade/quagga2';
import './test.css'


const Test = () => {
    useEffect(() => {
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            Quagga.init({
                inputStream: {
                    name:"Live",
                    type: "LiveStream",
                    target: document.querySelector('#video'),
                    constraints: {
                        facingMode: 'environment',
                    },
                },
                numOfWorkrs: 1,
                locate: true,
                decoder: {
                    readers: ['ean_reader'],
                },
            },
            );
            Quagga.start()
        }
    }, []);
    
    return <div className="video" id="video"></div>
}

export default Test;