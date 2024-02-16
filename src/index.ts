import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import planRoute from "./server/routes/planRoute";
import DbConnection from "../database";
import "dotenv/config"
import env from "../src/util/validateEnv";


const app: Express = express();
const port = env.PORT;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

DbConnection();

app.use('/uploads', express.static('uploads'));

app.use('/api/v1/dk', planRoute);

app.get('/*', (req:Request,res:Response)=>{
    res.status(404).send(`<h1>404 Error<h1>`);
});

app.listen(port, () => {
    console.log(`BuilderBid server running on: ${port}`);
});