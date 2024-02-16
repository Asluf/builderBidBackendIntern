import "dotenv/config";
import mongoose from "mongoose";
import env from "./server/middleware/validateEnv";



const DbConnection = async () => {
    await mongoose.connect(env.DATABASE)
    .then((con)=>{
        console.log(`MongoDB is connected to the host :${con.connection.name}`);
    })
    .catch((err)=>{
        console.log(err)
    })

}

export default DbConnection;