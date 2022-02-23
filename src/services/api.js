import axios from "axios";

export const api = axios.create({
    baseURL: "http://10.3.1.95:8000",
});

export const createSession = (username, password) => {
    return api.post('/auth/', { username, password });
};

export const getVendas = async () => {
    return api.get("/api/v2/venda/");
}