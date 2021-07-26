import axios from "axios";
import { store } from '../redux/store';

const api = axios.create();

api.interceptors.request.use((config) => {
    const accessToken: string = store.getState().auth.accessToken;
    
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    
    return config;
});

export default api;