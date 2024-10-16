import fs from "fs";
import express, {Express,Request,Response} from "express";
import {router} from './routes/index';
import cors from "cors";
import "dotenv/config";
import DbConnection from "../database";
import env from "./middleware/validateEnv";
import bodyParser from "body-parser";

fs.writeFileSync("test.txt", "test");

const app: Express = express();
app.use(cors());

const port = env.PORT;

DbConnection();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/api', router);


app.use(function(req:Request, res:Response) {
    res.status(404).send({url: req.originalUrl + " " + 'not found'})
});

app.listen(port, () => {
    console.log(`BuilderBid server running on: ${port}`);
});