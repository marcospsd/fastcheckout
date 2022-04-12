import React, {useEffect} from 'react'
import Quagga from '@ericblade/quagga2';
import './barcode.css'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { api } from '../../services/api'


const LeitorBarCode = ({openvideo, setOpenVideo, setDescriPro, setCodPro, setValorPro, setValorSis}) => {
    const OnDetected = result => {
        Quagga.offDetected(OnDetected);
        const isbn = result.codeResult.code;
        if (isbn) {
            api.get(`/api/v1/produto/${isbn}`)
            .then(res => {
                res.data.map((res) => {
                    setCodPro(res.codigo)
                    setDescriPro(res.descricao)
                    setValorSis(res.valor_unitsis)
                    setValorPro(res.valor_unitpro)   
                })
            setOpenVideo(false)
            OnDetected()
        }
        )} 

    }

    useEffect(() => {
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            Quagga.init({
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    target: document.querySelector("#video"),
                    constraints: {
                        facingMode: "environment",
                    },
                },
                numOfWorkrs: 4,
                locate: true,
                decoder: {
                    readers: ['code_128_reader'],
                },
            },
            err => {
                if (err) {
                    console.error(err);
                    alert("Error ao abrir a câmera do dispositivo")
                    return;
                }
                Quagga.start();  
            },
            Quagga.onDetected(OnDetected)
            );
        }
    }, []);
    
    return (
        <Modal
        open={openvideo}
        onClose={() => setOpenVideo(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disablePortal
        id='modal'>
            <Box
                id='box-video-venda'
            >
                <div className="video" id="video"></div>
            </Box>
        </Modal>    
        
    
    )
}

export default LeitorBarCode;