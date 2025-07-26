import chalk from "chalk";
import knexDb from "../database/init.js";
import currencyService from "../services/currency-service.js";

export default async function getAllCurrencies(request,response,next){
    let {per_page,page} = request.body;            
    if(!page)page = 1;
    if(!per_page)per_page=15;
    
    const cacheKey = `currencies-${page}-${per_page}`

    console.log(chalk.bgBlueBright(chalk.whiteBright(cacheKey)))

    try{
        const cached = await global.redisClient.get(cacheKey);
        if(cached){
            console.info(chalk.bgBlueBright(chalk.yellowBright("Getting cache")));
            let data = await knexDb.select("*").from("currencies").paginate({
                perPage:per_page,
                currentPage:page
            });
            response.json({
                currencies:data.data.map(c=>(JSON.parse(c.data))),
                pagination:data.pagination
            })
        }else{
            console.info(chalk.bgBlueBright(chalk.yellowBright("Setting cache")))
            const res = await currencyService.getAll(page == 1 ? 1 : (page * per_page),per_page);
            global.redisClient.set(cacheKey,'has_been_fetched',{EX:Number(process.env.CACHE_DURATION)})

            for(let currency of res.data)
                await knexDb.table("currencies").insert({
                    real_id:currency.id,
                    data:currency
                }).onConflict('real_id').merge(['data'])
                
            response.json({
                currencies:res.data,
                pagination:{ perPage:per_page, currentPage: page}
            })
        }
    }catch(error){
        console.error(error)
        response.status(500).json({error:error.message});
    }
}