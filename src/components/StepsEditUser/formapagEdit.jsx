import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import IconButton  from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControl from '@mui/material/FormControl';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });



export const FormaPagForm = ({ formData, setForm, navigation }) => {
    const [formapag, setFormaPag] = useState("")
    const [parcelas, setParcelas] = useState("")
    const [valor, setValor] = useState("")
    const [totalvenda, setTotalvenda] = useState("")
    const [key, setKey] = useState(0)
    const [ open, setOpen] = useState(false)
    const [ alert, setAlert] = useState('')

    
    const quantidadevendas = formData.corpovenda.map(x => x).length;
    const total_venda = formData.corpovenda.map(x => x.valor_unitpro).reduce((a, b) => parseInt(a) + parseInt(b), 0)
    const saldo = (formData.corpovenda.map(x => x.valor_unitpro).reduce((a, b) => parseInt(a) + parseInt(b), 0)) - (formData.formavenda.map(x => x.valor).reduce((a, b) => parseInt(a) + parseInt(b), 0))


    const Adicionar = () => {
        if (formapag !== "") {
            if (valor !== "") {
                if (saldo-valor > -1) {
                    setForm({...formData, 
                        total_venda: totalvenda,            
                        formavenda: [
                        ... formData.formavenda,
                        { 
                        forma: formapag, 
                        parcelas: parcelas,
                        valor: valor,
                        id: key+1,
                    },
                    ],
                }
                )
                    setKey(key+1)
                    setFormaPag("")
                    setParcelas("")
                    setValor("")
                } else {
                    setAlert('o Valor informado é maior que o saldo devedor !')
                    setOpen(true)
                }
               
            }
        } else {
            setAlert("Você deve adicionar as formas de pagamento")
            setOpen(true)
        }
    }



    const SelecaoParcela = (id) => {
        switch (id) {
            case "DH":
                    setParcelas("1")

            case "DP":
                    setParcelas("1")

            case "CD":
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
        const newForma = formData.formavenda.filter(x => x.id !== id)
        setForm({...formData, formavenda: newForma})
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

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
            <FormControl fullWidth>
            <InputLabel id="forma1">Forma de Pagamento</InputLabel>
                <Select
                labelId="forma1"
                id="demo-simple-select"
                value={formapag}
                onChange={(e) => {
                    SelecaoParcela(e.target.value)
                    setFormaPag(e.target.value)

                }}
                label="Forma de Pagamento"
                >
                    <MenuItem value="DH">Dinheiro</MenuItem>
                    <MenuItem value="CC">Cartão de Crédito</MenuItem>
                    <MenuItem value="CD">Cartão de Débito</MenuItem>
                    <MenuItem value="DP">Depósito em Conta</MenuItem>
                </Select>
                </FormControl>
            </div>
            <div className="labelforma">
                <FormControl fullWidth>
                    <InputLabel id="Label1">Parcelas</InputLabel>
                    <Select
                    labelId="Label1"
                    id="demo-simple-select"
                    value={parcelas}
                    label= "Parcelas"
                    onChange={(e) => {
                        setParcelas(e.target.value)
                    
                    }}
                    >
                        
                        <MenuItem value="1">1</MenuItem>
                        { total_venda > 200 && formapag === 'CC' && <MenuItem value="2">2</MenuItem> }
                        { total_venda > 600 && formapag === 'CC' && <MenuItem value="3">3</MenuItem> }
                        { total_venda > 800 && formapag === 'CC' && <MenuItem value="4">4</MenuItem> }
                        { total_venda > 1000 && formapag === 'CC' && <MenuItem value="5">5</MenuItem> }
                        { total_venda > 1200 && formapag === 'CC' && <MenuItem value="6">6</MenuItem> }
                        { total_venda > 1400 && formapag === 'CC' && <MenuItem value="7">7</MenuItem> }
                        { total_venda > 1600 && formapag === 'CC' && <MenuItem value="8">8</MenuItem> }
                        { total_venda > 1800 && formapag === 'CC' && <MenuItem value="9">9</MenuItem> }
                        { total_venda > 2000 && formapag === 'CC' && <MenuItem value="10">10</MenuItem> }

                    
                    </Select>
                </FormControl>
                <TextField id="dump" label="Valor" type="number" onChange={(e) => setValor(e.target.value)} value={valor} fullWidth/>
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
                    <tr key={forma.id}>
                    <td className='formaconteudo' >{FormasPagamento(forma.forma)}</td>
                    <td className='formaconteudo' >{forma.parcelas}</td>
                    <td className='formaconteudo' >{parseInt(forma.valor).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</td>
                    <td className='formaconteudo'><IconButton id='delete' onClick={() => DeletarForma(forma.id)}><DeleteIcon/></IconButton></td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            <div className="formpag-buttons">
            <Button id='back-forma' onClick={() => navigation.previous()} variant="contained">Back</Button>
            <Button id='next-forma' onClick={() => {
                if (saldo == 0) {
                    setForm({...formData, total_venda: total_venda})
                    navigation.next() 
                } else {
                    setAlert("Saldo não pode ser diferente de 0 !")
                    setOpen(true)
                }}} variant="contained">Next</Button>  
 
            </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '90%' }}>
                        {alert}
                    </Alert>
            </Snackbar> 
        </div>
    )
}