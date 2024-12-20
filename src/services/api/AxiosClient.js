import axios from "axios";

const BASE_URL=import.meta.env.VITE_API_BASE_URL;

const AxiosClient=axios.create({
    baseURL:BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

AxiosClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default AxiosClient;