import express from "express"
import chalk from 'chalk'
import cors from "cors"
import bodyParser from "body-parser"

export default function Boot(routes){
	const port = process.env.SERVER_PORT ?? 4000

	express()
	.use(bodyParser.json())
	.use(cors({
		origin: process.env.APP_URL,
		optionsSuccessStatus: 200
	}))
	.use((req,_,next)=>{
		console.log(`${chalk.green(new Date(Date.now()).toDateString()+" "+new Date(Date.now()).toTimeString())} - ${chalk.cyanBright(req.url)}`)
		next()
	})
	.use(routes)
	.listen(port)

	console.info(`Backend server is running on port ${chalk.yellowBright(port)}`)
}
