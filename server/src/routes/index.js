import { Router } from "express"
import getAllCurrencies from "../controllers/get-all-currencies.js"
import getCurrencyDetails from "../controllers/get-currency-details.js"

const router = Router()

router.post("/api/get-currency-detail",getCurrencyDetails)
router.get("/api/get-all-currencies",getAllCurrencies)

export default router