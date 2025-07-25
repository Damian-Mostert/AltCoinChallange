import CurrencyService from "../services/currency-service.js"

export default async function getAllCurrencies(request,response,next){
    try{
        if(!request.body.currency)throw "Missing currency slug";
        
        const {status,data} = await CurrencyService.getDetails(request.body.currency);
        console.info(status);
        response.json({
            currencies:data
        })
    }catch(error){
        console.error(error.message)
        response.status(500).json({error:error.message});
    }
}