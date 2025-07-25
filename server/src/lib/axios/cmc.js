import Axios from 'axios'

const axios = Axios.create({
	baseURL: process.env.COINMARKETCAP_BASE_URL,
	headers: {
		'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
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
