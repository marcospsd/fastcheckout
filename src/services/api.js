import axios from "axios";


export const api = axios.create({
    baseURL: "",
});

export const createSession = (username, password) => {
    return api.post('/auth/', { username, password });
};

export const deleteVendas = async(id) => {
    return api.delete(`/api/v2/venda/${id}`);
     }

     

/// SWR