
const mongoose = require('mongoose');

let DB_URL = "";
if (process.env.ENVIROMENT === "dev")
{
    console.log("connected");
    DB_URL = "mongodb://127.0.0.1:27017/ChatApp"
}
else
{
    DB_URL = `mongodb+srv://${process.env.CLUSTER_NAME}:${process.env.CLUSTER_PASSWORD}@${process.env.DB_HOSTNAME}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
}
const connectDB = ()=>{
    setTimeout(()=>{ 
        mongoose.connect(`${DB_URL}`, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
        });
    }, 2000);
}


const mongoDB = mongoose.connection;

mongoDB.on('error', error =>{
    console.log(`[ERROR]: ${error}`);
    return connectDB();
});

mongoDB.on("connected", ()=>{
    console.log(`[DB]: connected`);
});

mongoDB.on('disconnected', () => {
    console.log('disconnected');
});

require("./mongooseSchema");

module.exports = connectDB;