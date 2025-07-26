import { CURRENCY_SERVICE } from "../config/end-points";
import axios from "../init";

const currencyService = {
    async getAll(page:number,per_page:number){
        const res = await axios.get(CURRENCY_SERVICE.GET_ALL,{
            params:{
                page,
                per_page
            }
        });
        return res.data;
    },
    async getDetails(currency:string){
        const res = await axios.post(CURRENCY_SERVICE.GET_DETAILS,{currency});
        return res.data;
    }
};
export default currencyService;