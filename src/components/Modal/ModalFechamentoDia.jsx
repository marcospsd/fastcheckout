import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton  from '@mui/material/IconButton';
import PrintIcon from '@mui/icons-material/Print';
import CloseIcon from '@mui/icons-material/Close';
import {useFetchNormal} from '../../hooks/useFetch';
import _ from 'lodash'
import './ModalFechamentoDia.css'
import FechamentoCaixa from '../../reports/fechamento';


const ModalFechamento = ({ openfech, setOpenFech}) => {
    const {data} = useFetchNormal(`/api/v2/formavenda/`)

    const Fattotal = () => {
        try {
            const dado = parseInt(data.map(x => x.valor).reduce((a, b) => parseInt(a) + parseInt(b), 0)).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
            return dado
        } catch {
            return 0
        }
    }

    const values = _.groupBy(data, (value) => value.forma)

    const FatCC = () => {
        try {
            const dado = parseInt(values.CC.map(x => x.valor).reduce((a, b) => parseInt(a) + parseInt(b), 0)).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
            return dado
        } catch {
            return 0
        }
    }

    const FatDH = () => {
        try {
            const dado = parseInt(values.DH.map(x => x.valor).reduce((a, b) => parseInt(a) + parseInt(b), 0)).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
            return dado
        } catch {
            return 0
        }
    }

    const FatCD = () => {
        try {
            const dado = parseInt(values.CD.map(x => x.valor).reduce((a, b) => parseInt(a) + parseInt(b), 0)).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
            return dado
        } catch {
            return 0
        }
    }

    const FatDP = () => {
        try {
            const dado = parseInt(values.DP.map(x => x.valor).reduce((a, b) => parseInt(a) + parseInt(b), 0)).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
            return dado
        } catch {
            return 0
        }
    }


    return (
        <Modal
                      open={openfech}
                      onClose={() => setOpenFech(false)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description">
                  <Box
                      id='box-fechamento-caixa'
                  >
                      <div className="fechamento-dia">
                        <div className="faturamentotot">
                            <h3>Resumo Diário</h3>
                        </div>
                        <p><b>Dinheiro: </b>{FatDH()}</p>
                        <p><b>Deposito em Conta: </b>{FatDP()}</p>
                        <p><b>Cartão de Crédito: </b>{FatCC()}</p>
                        <p><b>Cartão de Débito: </b>{FatCD()}</p>
                        <hr></hr>
                        <p><b>Total: </b>{Fattotal()}</p>
                        <div className="button-print" >
                            <IconButton onClick={() => FechamentoCaixa(data)}>
                                <PrintIcon sx={{ fontSize: 40}}/>
                            </IconButton>
                        </div>
                      </div>


                      <IconButton id="closeitem" onClick={() => {setOpenFech(false)}}><CloseIcon/></IconButton>
                  </Box>
              </Modal>
    )
}

export default ModalFechamento;