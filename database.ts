const mongoose = require('mongoose');
const DbConnection = async ()=>{
    await mongoose.connect(process.env.DATABASE)
    .then((con:any)=>console.log(`MongoDB is connected to the database :${con.connection.name}`))
    .catch((err:any)=>{
        console.log(err)
    });
}

module.exports = DbConnection  