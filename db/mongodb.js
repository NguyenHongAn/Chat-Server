const mongoose = require('mongoose');

const DB_URL = `mongodb+srv://${process.env.CLUSTER_NAME}:${process.env.CLUSTER_PASSWORD}@${process.env.DB_HOSTNAME}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

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

connectDB();