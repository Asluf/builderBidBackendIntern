import express, { Express, Request, Response } from "express";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";
import UserRoute from "./server/routes/userRoute";
import DbConnection from "../database";


const app: Express = express();
fs.writeFileSync("test.txt", "test");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
DbConnection();

app.use('/uploads', express.static('uploads'));

app.use('/api/v1/dk', UserRoute);

app.get('/*', (req:Request,res:Response)=>{
    res.status(404).send(`<h1>404 Error<h1>`);
});

