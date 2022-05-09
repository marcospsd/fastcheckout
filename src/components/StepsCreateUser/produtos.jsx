import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import IconButton  from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { api } from '../../services/api';
import InputAdornment from '@mui/material/InputAdornment';
import PercentIcon from '@mui/icons-material/Percent';
import CircularProgress from '@mui/material/CircularProgress';

import LeitorBarCode from '../CodBar/barcode';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export const ProdutosForm = ({ formData, setForm, navigation }) => {
    const [codpro, setCodPro] = useState("")
    const [descripro, setDescriPro] = useState("")
    const [valorsis, setValorSis] = useState("")
    const [valorpro, setValorPro] = useState("")
    const [pesquisa, setPesquisa] = useState("")
    const [resultado, setResultado] = useState([])
    const [porcdesc, setPorcDesc] = useState("")
    const [key, setKey] = useState(0)
    const [ open, setOpen] = useState(false)
    const [ alert, setAlert] = useState('')
    const [ openvideo, setOpenVideo] = useState(false)
    const [ keyautcomplete, setKeyAutocomplete] = useState(false)

    const Adicionar = () => {
        if (codpro !== "") {
            if (porcdesc >= 0) {
            setForm({...formData, corpovenda: [
            ... formData.corpovenda,
            { 
            codpro: codpro, 
            descripro: descripro, 
            quantidade: 1,
            valor_unitsis: valorsis,
            valor_unitpro: valorpro,
            key: key+1,
            },
            ],
            }
            )
            setKey(key+1)
            setCodPro("")
            setDescriPro("")
            setValorSis("")
            setValorPro("")
            setPorcDesc("")
            setResultado([])
            setPesquisa("")
            setKeyAutocomplete(false)
            }
            else {
                setAlert("O valor do Sistema não pode ser menor que o Valor Promocional")
                setOpen(true)
            }
        } else {
            setAlert("Você deve adicionar algum item !")
            setOpen(true)
        }
    }


    const Pesquisar = async (pesquisa) => {
        setPesquisa(pesquisa)
        if (pesquisa !== "") {
            api.get(`/api/v1/produto/${pesquisa}`)
            .then((res) => {
                if (Array.isArray(res.data)){
                    setResultado(res.data) 
                } else {
                    setResultado([])
                }   
            })
        }
        return;
    }

    const DeletarCorpo = (id) => {
        const newForma = formData.corpovenda.filter(x => x.key !== id)
        setForm({...formData, corpovenda: newForma})
    }

    const DesctoValue = (id) => {
        if (id !== "") {
        try {
            const porcento = id/100
            const produto = 1-porcento
            setValorPro(Math.round((valorsis*produto)))
        } catch { 
            setPorcDesc(0)
            setValorPro(0)}
        } else { 
            setValorPro(0) 
        }
    }

    const ValuetoDesc = (id) => {
        if (id !== "") {
            try {
            const porcento = (1 - (valorpro / valorsis )) * 100
            setPorcDesc(Math.round(porcento))
            } catch {
            setValorPro(0)
            setPorcDesc(0)
        }
        } else { setValorPro(0)}
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    return (
        <div className='container-products'>
            <p>Produtos</p>
            <div className='label-products'>
                <div className='col-search-products'>
                <IconButton>
                    {/* <CameraAltIcon onClick={() => setOpenVideo(true)}/> */}
                </IconButton>
                {openvideo && <LeitorBarCode 
                                openvideo={openvideo} 
                                setOpenVideo={setOpenVideo}
                                setDescriPro={setDescriPro}
                                setCodPro={setCodPro}
                                setValorPro={setValorPro}
                                setValorSis={setValorSis}
                                />
                
                
                }                
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    key={keyautcomplete}
                    getOptionLabel={(resultados) => `${resultados.codigo} - ${resultados.descricao}`}
                    onChange = {(resultado, newResultado) => {
                        if (newResultado) {
                            const result = ((newResultado.valor_unitpro / newResultado.valor_unitsis) - 1) * -100
                            setCodPro(newResultado.codigo)
                            setDescriPro(newResultado.descricao)
                            setValorSis(newResultado.valor_unitsis)
                            setValorPro(newResultado.valor_unitpro)
                            setPorcDesc(Math.round(result))
                            setKeyAutocomplete(true)
                
                        }
                        else { setPesquisa("") }
                        
                    }}
                    
                    options={resultado}
                    renderInput={(params) => <TextField {...params} label="Pesquise pela Descrição do Produto" onChange={(e) => Pesquisar(e.target.value)} value={pesquisa}/>}
                    />
                </div>
                <div className='col-descri'>
                <TextField label='Descricao' value={descripro} disabled size="small" fullWidth/>
                </div>
                <div className='col-products'>
                <TextField label='Codigo' value={codpro} disabled size="small" fullWidth/>
                <TextField label='Valor Sistema' value={valorsis} disabled size="small" fullWidth/>
                </div>
                <div className='col-products'>
                <TextField label='Desconto' value={porcdesc} size="small" onChange={(e) => setPorcDesc(e.target.value)} 
                onBlur={ () => DesctoValue(porcdesc)} fullWidth
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <PercentIcon />
                        </InputAdornment>
                    ),
                    }}/>
                <TextField label='Valor Promoção' value={valorpro} onChange={(e) => setValorPro(e.target.value)} size="small" onBlur={ () => ValuetoDesc(valorpro)} fullWidth/>
                </div>
                
            </div>
            <Button id='back' variant="contained" onClick={Adicionar}>Adicionar</Button>
            {formData.corpovenda.map((venda) =>
            <div className='card-products' key={venda.key}>
                <label id='Codigo'><strong>Codigo: </strong>{venda.codpro}</label>
                <label id='Descricao'><strong>Descricao: </strong>{venda.descripro}</label>
                <label id='Valor Sistema'><strong>Valor Sistema: </strong>{parseInt(venda.valor_unitsis).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</label>
                <label id='Valor Promoção'><strong>Valor Promoção: </strong>{parseInt(venda.valor_unitpro).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</label>
                <label id='Desconto'><strong>Desconto: </strong>{Math.round(((venda.valor_unitpro / venda.valor_unitsis) - 1) * -100)} %</label>
                <IconButton id='delete' onClick={() => DeletarCorpo(venda.key)}><DeleteIcon/></IconButton>
            </div>
            )}
            <div className='buttons-products'>
                <Button id='back' onClick={() => navigation.previous()} variant="contained">Voltar</Button>
                <Button id='next' onClick={() => {
                    if (formData.corpovenda != "") {
                    navigation.next() 
                    } else { setAlert("Não pode ser vazio !")
                            setOpen(true)
                    }
                }} variant="contained">Próximo</Button>

            </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} fullWidth>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {alert}
                    </Alert>
            </Snackbar>
        </div>

    
    )
}