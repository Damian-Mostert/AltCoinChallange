import chalk from "chalk";
import knexDb from "../database/init.js";
import CurrencyService from "../services/currency-service.js"

export default async function getAllCurrencies(request,response,next){
    try{
        const {currency} = request.body
        if(!currency)throw "Missing currency slug"
        const cached = await global.redisClient.get(`currency-${currency}`)

        console.log(await global.redisClient.ttl(`currency-${currency}`))
        const handleCache = async ()=>{
            try{
                console.info(chalk.bgBlueBright(chalk.yellowBright("Setting cache")))
                await global.redisClient.set(`currency-${currency}`,'has_been_fetched',{EX:Number(process.env.CACHE_DURATION)})
                await knexDb.table("currency_data").insert({
                    for_slug:currency,
                    data
                }).onConflict('for_slug').merge(['data'])
                const {data} = await CurrencyService.getDetails(request.body.currency)
                response.json({
                    data
                })
            }catch(e){
                try{
                    await handleGetCache(true)
                }catch(e){
                    console.error(e);
                    response.json({
                        error:"There was an error loading details"
                    })
                }
            }
        }

        const handleGetCache = async (failedCacheCheck = false) =>{
            console.info(chalk.bgBlueBright(chalk.yellowBright("Getting cache")))
            const cachedData = await knexDb.table("currency_data").where(`for_slug`,currency).first()
            if(cachedData){
                console.info(chalk.bgBlueBright(chalk.yellowBright("Cache found")))
                let {data} = cachedData;
                response.json({
                    data:JSON.parse(data)
                })
            }else if(failedCacheCheck)
             throw "Failed to get cache after a failed API call!"
            else await handleCache()
        }

        if(cached) await handleGetCache() 
        else await handleCache()
    }catch(error){
        console.error(error.message)
        response.status(500).json({error:error.message})
    }
}