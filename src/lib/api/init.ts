import Axios from 'axios'

const axios = Axios.create({
    baseURL: import.meta.env.VITE_BE_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
})

export default axios;