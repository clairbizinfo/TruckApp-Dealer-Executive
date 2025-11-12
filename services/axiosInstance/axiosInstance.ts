// src/services/api/axiosInstance.js
import axios from 'axios';
import { getToken } from '../AuthenticationService/tokenService';

const API_BASE_URL = 'http://192.168.1.7:8080/api/user'; // your backend

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});


axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('[Axios Error Response]', error.response.status, error.response.data);

            if (error.response.status === 401) {
                console.warn('Unauthorized — token expired or invalid');
            }
        } else if (error.request) {
            console.error('[Axios No Response]', error.message);
        } else {
            console.error('[Axios Setup Error]', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
