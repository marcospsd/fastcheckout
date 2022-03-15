import React, {useState} from 'react'
import Box from '@mui/material/Box';
import "../Modal/ModalViewVenda"
import Button from '@mui/material/Button';
import {api} from '../../services/api'
import SenhaVenda from '../../reports/senha'


import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const PreviewForm = ({ formData, setForm, navigation, fecharModal, state }) => {
  const [ openmodal, setOpenModal] = useState(false)
  const [ alert, setAlert] = useState('')

  console.log(formData)
    return (
        <div>
          <Box id='box-view-itens'>
              <div id='tittle-modal'>
                <label><strong>RESUMO DA VENDA</strong></label>
              </div>
              <div id='dadosvenda'>
                <div className="row">
                  <div className='col'>
                    <label><strong>Vendedor: </strong>{formData.nomevend}</label>
                    <label><strong>CPF: </strong>{(formData.cpf).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</label>
              
                  </div>
                  <div className='col'>
                    <label><strong>CodVend: </strong> {formData.codvend}</label>
                    <label><strong>Total da Venda: </strong>{parseInt(formData.total_venda).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</label>
                  </div>
                </div>
                <label className='dadoscli'><strong>Nome: </strong> {formData.nome}</label>
                <label className='dadoscli'><strong>E-mail: </strong> {formData.email}</label>
                <label className='dadoscli' id="dadosclifinal"><strong>Telefone: </strong> {(formData.telefone)}</label>
              </div>
              <div id='formadepagamento'>
              <p><strong>FORMA DE PAGAMENTO</strong></p>
                <table>
                  <tbody>
                  <tr id='formatitle'>
                    <td>Forma de Pagamento</td>
                    <td>Parcelas</td>
                    <td>Valor</td>
                  </tr>
                {formData.formavenda.map((forma) => (
                  <tr key={forma.id}>
                    <td className='formaconteudo' >{(forma.forma)}</td>
                    <td className='formaconteudo' >{forma.parcelas}</td>
                    <td className='formaconteudo' >{parseInt(forma.valor).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</td>
                  </tr>
                ))}
                </tbody>
                </table>
              </div>
              <div id='corpovenda'>
                <p><strong>PRODUTOS</strong></p>
                <table>
                  <tbody>
                  <tr id='corpotittle'>
                      <td>Código</td>
                      <td>Descrição</td>
                      <td>Valor</td>
                      
                  </tr>
                {formData.corpovenda.map((corpovenda) => (
                  <tr key={corpovenda.id}>
                  <td>{corpovenda.codpro}</td>
                  <td>{corpovenda.descripro}</td>
                  <td>{parseInt(corpovenda.valor_unitpro).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</td>
                  </tr>
                ))}
                </tbody>
                </table>
              </div>
              <div id='opcoes-preview'>
                <Button id='back-forma' onClick={() => navigation.previous()} variant="contained">Back</Button>
                <Button id='back-forma' onClick={async () => {
                    await api.post(`/api/v2/venda/`, formData)
                    .then((res) => {
                      if (res.status !== 201) {
                        setAlert("Algo deu errado !")
                        setOpenModal(true)
                      } else {
                        setAlert(`Criado com sucesso, Ordem:${res.data.ordem}`)
                        setOpenModal(true)
                        SenhaVenda(res.data)
                        fecharModal()
                        navigation.next()
                        setForm(state)
                      }
                    })
                }} variant="contained">Enviar</Button>
              </div>
              
              <Snackbar open={openmodal} autoHideDuration={5000} onClose={() => setOpenModal(false)}>
                    <Alert onClose={() => setOpenModal(false)} severity="error" sx={{ width: '75%' }}>
                        {alert}
                    </Alert>
                </Snackbar>

          </Box>

      </div>
    )
} 