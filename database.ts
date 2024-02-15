import "dotenv/config";
import mongoose from "mongoose";
import env from "./src/util/validateEnv";



const DbConnection = async () => {
    await mongoose.connect(env.DB_URI)
    .then((con)=>{
        console.log(`MongoDB is connected to the host :${con.connection.name}`);
    })
    .catch((err)=>{
        console.log(err)
    })

}

export default DbConnection;
