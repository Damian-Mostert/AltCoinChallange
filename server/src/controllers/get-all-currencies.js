import chalk from "chalk";
import knexDb from "../database/init.js";
import currencyService from "../services/currency-service.js";

export default async function getAllCurrencies(request,response,next){
    const {per_page,page} = request.query;
    try{
        const cached = await global.redisClient.get('currencies');
        if(cached){
            console.info(chalk.bgBlueBright(chalk.yellowBright("Getting cache")));
            let data = await knexDb.select("*").from("currencies");
            response.json({
                currencies:data.map(c=>(JSON.parse(c.data)))
            })
        }else{
            console.info(chalk.bgBlueBright(chalk.yellowBright("Setting cache")))
            const res = await currencyService.getAll();
            global.redisClient.set('currencies','has_been_fetched',{ex:60})

            for(let currency of res.data)
                await knexDb.table("currencies").insert({
                    real_id:currency.id,
                    data:currency
                }).onConflict('real_id').merge(['data'])
                
            response.json({
                currencies:res.data.slice(0, 10)
            })
        }
    }catch(error){
        console.error(error.message)
        response.status(500).json({error:error.message});
    }
}