import { CURRENCY_SERVICE } from "../config/end-points.js";
import axios from "../lib/axios/cmc.js";
const currencyService = {
    async getAll(){
        const res = await axios.get(CURRENCY_SERVICE.GET_ALL)
        return res.data;
    },
    async getDetails(slug){
        const res = await axios.get(CURRENCY_SERVICE.GET_DETAILS,{
            params:{
                slug
            }
        })
        return res.data;
    }
};
export default currencyService;