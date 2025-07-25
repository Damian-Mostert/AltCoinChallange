import CoinMarketCapService from "../../axios/services/coin-market-cap-service.js";
import query from "../../database/init.js";

export default function GetCurrencys(request,response){
    query("",[]);
    CoinMarketCapService.getAllCurrencys();
    return response.json({

    });
}