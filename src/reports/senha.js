import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import OTDZ from '../statics/FAST.png'


function SenhaVenda(data) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    

    const titulo = [];

    const listdata = [

        {
            text: '-------- ORDEM DE SERVIÇO --------',
            fontSize: 4,
            bold: true,
            margin: [0,5,0,0],
            alignment: 'center'
            
        },


        {
            margin: [0,5,0,0],
            fontSize: 4,
            alignment: 'justify',
            bold: true,
            columns: [
                {
                    text: 'Ordem'
                },
                {
                    text: 'CPF'
                }
            ]

        },
        {
            fontSize: 4,
            alignment: 'justify',
            columns: [
                {
                    text: data.ordem
                },
                {
                    text: (data.cpf).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
                }
            ]

        },
        {
            margin: [0,2,0,0],
            fontSize: 4,
            alignment: 'justify',
            bold: true,
            columns: [
                {
                    text: 'Vendedor'
                },
                {
                    text: 'Total da Venda'
                }
            ]

        },
        {
            fontSize: 4,
            alignment: 'justify',
            columns: [
                {
                    text: data.vendedor
                    
                },
                {
                    text: parseInt(data.total_venda).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
                }
            ]

        },
        {
            margin: [0,2,0,0],
            fontSize: 4,
            alignment: 'justify',
            bold: true,
            text: 'Nome: '
        },
        {
            fontSize: 4,
            alignment: 'justify',
            text: data.nome
        },
        {
            text: '--------------------------------------------------------',
            fontSize: 4,
            bold: true,
            margin: [0,5,0,0],
            alignment: 'center'
        },
    ];

    const rodape = [];

    const docDefinitions = {
        pageSize: {
            width: 80,
            height: 297,
        },
        pageMargins: [1, 0, 1, 0],
        pages: 2,

        header: [titulo],
        content: [listdata],
        footer: [rodape],
    }

    pdfMake.createPdf(docDefinitions).open({}, window)
}

export default SenhaVenda