const mongoose = require("mongoose");
const MONGOURI = "mongodb://127.0.0.1:27017/iNotebook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1";

const connectToMongo = async()=>{
    console.log("Connecting MongoDB");

    await mongoose.connect(MONGOURI);

    console.log("Connected to MongoDB")
}

module.exports = connectToMongo;