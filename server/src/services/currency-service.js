import { CURRENCY_SERVICE } from "../config/end-points.js";
import axios from "../lib/axios/cmc.js";
const currencyService = {
    async getAll(start=1,limit = 1){
        const res = await axios.get(CURRENCY_SERVICE.GET_ALL,{
            params:{
                start,
                limit
            }
        })
        return res.data;
    },
    async getDetails(slug){
        const res = await axios.get(CURRENCY_SERVICE.GET_DETAILS,{
            params:{
                slug:slug,
            }
        })
        return res.data;
    }
};
export default currencyService;