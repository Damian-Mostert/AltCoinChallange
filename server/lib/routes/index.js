import { Router } from "express";
const routes = Router();

import getAllCurrency from "./callback/get-all-currency.js";
import getCurrencyDetails from "./callback/get-currency-details.js";

//POST ROUTES
const post_routes = {
    "/api/v1/get-currency-details":getCurrencyDetails,
    "/api/v1/get-all-currency":getAllCurrency
};

//GET ROUTES
const get_routes = {
};


Object.keys(post_routes).map(r=>routes.post(r,post_routes[r]));
Object.keys(get_routes).map(r=>routes.get(r,get_routes[r]));
export default routes;