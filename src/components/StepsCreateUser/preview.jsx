import React from 'react'
import Box from '@mui/material/Box';
import "../Modal/ModalViewVenda"


export const PreviewForm = ({ formData, setForm, navigation }) => {


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
              <div id='opcoes'>
                
              </div>
          </Box>

      </div>
    )
} 