import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import IconButton  from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { maxWidth } from '@mui/system';
import { WindowSharp } from '@mui/icons-material';



export const FormaPagForm = ({ formData, setForm, navigation }) => {
    const [formapag, setFormaPag] = useState("")
    const [parcelas, setParcelas] = useState("")
    const [valor, setValor] = useState("")
    const [totalvenda, setTotalvenda] = useState("")
    const [key, setKey] = useState(0)

    const Adicionar = () => {
        if (formapag !== "") {
        setForm({...formData, 
            total_venda: totalvenda,            
            formavenda: [
            ... formData.formavenda,
            { 
            forma: formapag, 
            parcelas: parcelas,
            valor: valor,
            ident: key+1,
        },
        ],
    }
    )
        setKey(key+1)
        setFormaPag("")
        setParcelas("")
        setValor("")
        } else {
            window.alert("não pode adicionar vazio !")
        }
    }

    const quantidadevendas = formData.corpovenda.map(x => x).length;
    const total_venda = formData.corpovenda.map(x => x.valor_unitpro).reduce((a, b) => parseInt(a) + parseInt(b), 0)
    const saldo = (formData.corpovenda.map(x => x.valor_unitpro).reduce((a, b) => parseInt(a) + parseInt(b), 0)) - (formData.formavenda.map(x => x.valor).reduce((a, b) => parseInt(a) + parseInt(b), 0))

    const SelecaoParcela = (id) => {
        switch (id) {
            case "DH":
                    setParcelas("1")

            case "DP":
                    setParcelas("1")
            } 
    }
    
    const FormasPagamento = (id) => {
        switch (id) {
            case "DH":
                return "Dinheiro"
            case "CC":
                return "Cartão de Crédito"
            case "CD":
                return "Cartão de Débito"
            case "DP":
                return "Depósito em Conta"
        }
    }

    const DeletarForma = (id) => {
        const newForma = formData.formavenda.filter(x => x.ident !== id)
        setForm({...formData, formavenda: newForma})
    }

    console.log(formData)
    return (
        <div className="container-formapag">
            <div className='tittle-formapag'>
                <p>Forma de Pagamento</p>
            </div>
            <div className="dadosvenda-formapag">
                <div className="formpag-quantidade">
                    <label><strong>Quant.</strong></label>
                    <label>{quantidadevendas}</label>    
                </div>
                <div className="formpag-valortotal">
                    <label><strong>Total</strong></label>
                    <label>{parseInt(total_venda).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</label>
                </div>
                <div className="formpag-saldo">
                    <label><strong>Saldo</strong></label>
                    <label>{parseInt(saldo).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</label>    
                </div>   
            </div>
            <div className="selectforma">
            <InputLabel id="demo-simple-select-label">Forma de Pagamento</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formapag}
                onChange={(e) => {
                    SelecaoParcela(e.target.value)
                    setFormaPag(e.target.value)

                }}
                fullWidth
                >
                    <MenuItem value="DH">Dinheiro</MenuItem>
                    <MenuItem value="CC">Cartão de Crédito</MenuItem>
                    <MenuItem value="CD">Cartão de Débito</MenuItem>
                    <MenuItem value="DP">Depósito em Conta</MenuItem>
                </Select>
            </div>
            <div className="labelforma">
                <TextField label="Parcelas" type="number" onChange={(e) => setParcelas(e.target.value)} value={parcelas} maxLenght="1"/>
                <TextField label="Valor" onChange={(e) => setValor(e.target.value)} value={valor}/>
            </div>
            <div className="buttonadd-forma">
                <Button id="next-forma" variant="contained" onClick={Adicionar} fullWidth>Adicionar</Button>
            </div>
            <div className='card-formapag'>
                <table>
                    <tbody>
                    <tr id='formatitle'>
                    <td><strong>Forma Pag.</strong></td>
                    <td><strong>Parc.</strong></td>
                    <td><strong>Valor</strong></td>
                    <td><strong>Delete</strong></td>
                    </tr>
                { formData.formavenda.map((forma) => (
                    <tr key={forma.ident}>
                    <td className='formaconteudo' >{FormasPagamento(forma.forma)}</td>
                    <td className='formaconteudo' >{forma.parcelas}</td>
                    <td className='formaconteudo' >{parseInt(forma.valor).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</td>
                    <td className='formaconteudo'><IconButton id='delete' onClick={() => DeletarForma(forma.ident)}><DeleteIcon/></IconButton></td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            <div className="formpag-buttons">
            <Button id='back-forma' onClick={() => navigation.previous()} variant="contained">Back</Button>
            <Button id='next-forma' onClick={() => {
                if (saldo !== 0) {
                    window.alert("Saldo deve está zerado !")
                } else {
                    setForm({...formData, total_venda: total_venda})
                    navigation.next() 
                }
                   
                }} variant="contained">Next</Button>    
            </div>

        </div>
    )
}