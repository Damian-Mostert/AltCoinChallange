import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BE_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
})

axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


export default axios;