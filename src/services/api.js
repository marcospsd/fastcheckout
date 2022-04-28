import axios from "axios";


export const api = axios.create({
    baseURL: "http://10.3.1.95:8000",
});

export const createSession = (username, password) => {
    return api.post('/auth/', { username, password });
};

export const deleteVendas = async(id) => {
    return api.delete(`/api/v2/venda/${id}`);
     }

     

/// SWR