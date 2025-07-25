import chalk from "chalk";
import knexDb from "../database/init.js";
import currencyService from "../services/currency-service.js";

export default async function getAllCurrencies(request,response,next){
    try{
        const cached = await global.redisClient.get('currencies');
        if(cached){
            console.info(chalk.bgBlueBright(chalk.yellowBright("Getting cache")));
            let data = await knexDb.select("*").from("currencies");
            response.json({
                currencies:data
            })
        }else{
            console.info(chalk.bgBlueBright(chalk.yellowBright("Setting cache")));
            const res = await currencyService.getAll();
            global.redisClient.set('currencies','has_been_fetched',{ex:60});
            for(let currency of res.data){
                await knexDb.table("currencies").insert({
                    real_id:currency.id,
                    rank: currency.rank,
                    name: currency.name,
                    symbol: currency.symbol,
                    slug:currency.slug,
                    is_active:currency.is_active,
                    first_historical_data:currency.first_historical_data,
                    last_historical_data:currency.last_historical_data,
                    platform_id: currency.platform?.id
                }).onConflict('real_id').ignore()
            }
            response.json({
                currencies:res.data
            })
        }
    }catch(error){
        console.error(error.message)
        response.status(500).json({error:error.message});
    }
}