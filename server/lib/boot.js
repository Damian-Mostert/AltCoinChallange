import express from "express"
import dotenv from "dotenv"
import { join } from "path"
import chalk from 'chalk'
import cors from "cors"

dotenv.config({path:join(process.cwd(),".env")})

export default function Boot(routes){
	const app = express();
	app.use(cors({
		origin: process.env.APP_URL,
		optionsSuccessStatus: 200
	}))
	app.use((req,_,next)=>{
		console.log(`${chalk.green(new Date(Date.now()).toDateString())} - ${chalk.cyanBright(req.url)}`)
		next()
	})
	app.use(routes)
	const port = process.env.SERVER_PORT ?? 4000
	app.listen(port)
	console.info(`Backend server is running on port ${chalk.yellowBright(port)}`)
}
