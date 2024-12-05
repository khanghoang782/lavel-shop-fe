import axios from "axios";

const BASE_URL="http://127.0.0.1:8000/api";

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