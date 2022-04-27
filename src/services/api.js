import axios from "axios";


export const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export const createSession = (username, password) => {
    return api.post('/auth/', { username, password });
};

export const deleteVendas = async(id) => {
    return api.delete(`/api/v2/venda/${id}`);
     }

     

/// SWR