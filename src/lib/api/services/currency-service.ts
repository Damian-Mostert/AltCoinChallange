import { CURRENCY_SERVICE } from "../config/end-points";
import axios from "../init";

const currencyService = {
    async getAll(){
        const res = await axios.get(CURRENCY_SERVICE.GET_ALL);
        return res.data;
    },
    async getDetails(currency:string){
        const res = await axios.post(CURRENCY_SERVICE.GET_DETAILS,{currency});
        return res.data;
    }
};
export default currencyService;