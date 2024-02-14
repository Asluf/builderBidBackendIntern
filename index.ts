import fs from "fs";
import express from "express";
const app = express();
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

fs.writeFileSync("test.txt", "test");

import bodyParser from "body-parser";
import mongoose from "mongoose";

app.use(cors());

var port = process.env.PORT || 6000;

// const DbConnection = require("./database");
// DbConnection();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
// import {router} from './routes/index.ts';
import {router} from './server/routes/index';
app.use('/api', router);

app.use(function(req:any, res:any) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port, () => {
    console.log(`BuilderBid server started on: ${port}`);
});