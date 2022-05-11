import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import _ from 'lodash'


function FechamentoCaixa(data) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
    

    const titulo = [];

    const listdata = [

        
        {
            text: '-------- FECHAMENTO DE CAIXA --------',
            fontSize: 4,
            bold: true,
            margin: [0,5,0,0],
            alignment: 'center'
            
        },

        {
            text: 'DATA ' + new Date(Date.now()).toLocaleDateString(),
            fontSize: 4,
            bold: true,
            margin: [0,5,0,0],
            alignment: 'center'
            
        },

        {
            text: 'Total: ' + Fattotal(),
            fontSize: 4,
            bold: true,
            margin: [0,5,0,0],
            alignment: 'justify'
        },

        {
            text: '--------------------------------------------------------',
            fontSize: 4,
            margin: [0,5,0,0],
            alignment: 'center'
            
        },
        {
            text: 'Cartão de Crédito: ' + FatCC(),
            fontSize: 4,
            margin: [0,5,0,0],
            alignment: 'justify'
        },
        {
            text: 'Cartão de Débito: ' + FatCD(),
            fontSize: 4,
            margin: [0,5,0,0],
            alignment: 'justify'
        },
        {
            text: 'Dinheiro: ' + FatDH(),
            fontSize: 4,
            margin: [0,5,0,0],
            alignment: 'justify'
        },
        {
            text: 'Deposito em Conta: ' + FatDP(),
            fontSize: 4,
            margin: [0,5,0,0],
            alignment: 'justify'
        },

        {
            text: '--------------------------------------------------------',
            fontSize: 4,
            margin: [0,5,0,0],
            alignment: 'center'
            
        },

        {
            text: '___________________________________________',
            fontSize: 4,
            margin: [0,15,0,0],
            alignment: 'center'
        },

        {
            text: 'Caixa: ' + localStorage.getItem('nome').replace(/"/g, ''),
            fontSize: 4,
            margin: [0,5,0,0],
            alignment: 'center'
        },




    ];

    const rodape = [];

    const docDefinitions = {
        pageSize: {
            width: 80,
            height: 300,
        },
        pageMargins: [1, 0, 1, 0],

        header: [titulo],
        content: [listdata],
        footer: [rodape],
    }

    pdfMake.createPdf(docDefinitions).open({}, window)
}

export default FechamentoCaixa