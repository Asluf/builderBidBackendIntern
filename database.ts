import "dotenv/config";
import express, {Express} from "express";
import mongoose from "mongoose";

const app: Express = express();
const port = process.env.PORT;

const DbConnection = async () => {
    await mongoose.connect(`${process.env.DB_URI}`)
    .then((con)=>{
        console.log(`MongoDB is connected to the host :${con.connection.host}`);
        app.listen(port, () => {
            console.log(`BuilderBid server running on: ${port}`);
        });
    })
    .catch((err)=>{
        console.log(err)
    })

}

export default DbConnection;
