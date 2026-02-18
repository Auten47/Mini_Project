import axios from 'axios';

export const api = axios.create({
    baseURL: "https://blog-backend-9eqd.onrender.com/api",
    withCredentials: true,
});