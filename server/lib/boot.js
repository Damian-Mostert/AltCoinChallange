import express from "express";
import dotenv from "dotenv";
import { join } from "path";

dotenv.config({
    path:join(process.cwd(),".env")
})

export default function Boot(Routes){
    const app = express();
    app.use(Routes);
    const port = process.env.SERVER_PORT ?? 4000;
    app.listen(port);
    console.info(`Backend server is running on port ${port}`)
}