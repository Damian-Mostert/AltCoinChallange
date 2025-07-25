import CurrencyService from "../services/currency-service.js"

export default async function getAllCurrencies(request,response,next){
    try{
        const {status,data} = await CurrencyService.getAll();
        console.info(status);
        response.json({
            currencies:data
        })
    }catch(error){
        console.error(error.message)
        response.status(500).json({error:error.message});
    }
}