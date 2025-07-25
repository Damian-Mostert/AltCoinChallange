import CoinMarketCapService from "../../axios/services/coin-market-cap-service.js";
import query from "../../database/init.js";


export default function GetCurrencyDetails(request,response){
    query("",[]);
    CoinMarketCapService.getAllCurrencys();

    response.json({

    });
}