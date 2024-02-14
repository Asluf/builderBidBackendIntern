import express, { Express, Request, Response } from "express";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import UserRoute from "./server/routes/userRoute";

const app: Express = express();
dotenv.config();
fs.writeFileSync("test.txt", "test");
app.use(cors());

var port = process.env.PORT || 6000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/v1/dk', UserRoute);

app.get('/*', (req:Request,res:Response)=>{
    res.status(404).send(`<h1>404 Error<h1>`);
});

app.listen(port, () => {
    console.log(`BuilderBid server running on: ${port}`);
});