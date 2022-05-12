import React from 'react'
import './barcode.css'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


const LeitorBarCode = ({openvideo, setOpenVideo, setDescriPro, setCodPro, setValorPro, setValorSis}) => {

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