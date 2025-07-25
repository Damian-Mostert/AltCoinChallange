import CurrencyService from "../services/currency-service.js"

export default async function getAllCurrencies(request,response,next){
    try{
        if(!request.body.currency)throw "Missing currency slug";
        const cached = await global.redisClient.get(`currency-${request.body.currency}`);
        if(cached){
            response.json({
                data:"test"
            })
        }else{
            global.redisClient.set(`currency-${request.body.currency}`,'has_been_fetched',{ex:60});
            const {data} = await CurrencyService.getDetails(request.body.currency);
            response.json({
                data
            })
        }
    }catch(error){
        console.error(error.message)
        response.status(500).json({error:error.message});
    }
}