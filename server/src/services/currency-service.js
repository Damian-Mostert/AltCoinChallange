import { CURRENCY_SERVICE } from "../config/end-points.js";
import axios from "../lib/axios/cmc.js";
const CurrencyService = {
    async getAll(){
        const res = await axios.get(CURRENCY_SERVICE.GET_ALL);
        return res.data;
    },
    async getDetails(currency){
        const res = await axios.post(CURRENCY_SERVICE.GET_DETAILS);
        return res.data;
    }
};
export default CurrencyService;