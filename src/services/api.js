import axios from 'axios';
import { REACT_APP_API_URL } from '../../constants.json';

const API_URL = REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('sickuser'));
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

export default api;
