import React, { useContext} from "react";
import { AuthContext } from "../../contexts/auth";
import { deleteVendas } from "../../services/api";
import { useFetch } from "../../hooks/useEffect";
import "./home.css"


const HomePage = () => {

    const user = String(localStorage.getItem('nome'))
    const { data, mutate } = useFetch('/api/v2/venda/');
    const { logout } = useContext(AuthContext);

    if (!data) {
        return <p>loading ...</p>
    }


    const handleLogout = () => {
        logout()

    };


    function ModalVenda(id) {
        if (window.confirm("Deseja apagar essa venda ?")) {
            deleteVendas(id);
        }
    };

    return (
        <div className="container">
            <h1>Bem Vindo {user}</h1>
            <div className="Diarios">
                <label>Vendas: 3</label>
                <label>Total Vendido: R$ 5000.00</label>
            </div>
            <div className="menu">
                <button onClick={() => mutate()}>Criar Venda</button>
            </div>
            <div className="vendas-container">
                {data.map((data) => (
                    <div className="view-venda" key={data.ordem}>
                        <p><strong>Ordem: </strong>{data.ordem}</p>
                        <p><strong>CPF: </strong>{data.cpf}</p>
                        <p><strong>Total da Venda: </strong>R${data.total_venda}</p>
                        <button id="excluir" onClick={() => ModalVenda(data.ordem)}>X</button>
                        <div className="itens">
                            <button id="veritems">Itens na Venda</button>
                        </div>
                    </div>
                    
                ))}
            </div>
        </div>
    );
};

export default HomePage;