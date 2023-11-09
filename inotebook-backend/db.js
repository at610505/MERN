const mongoose = require("mongoose");
require('dotenv').config();
const MONGODB_URL = process.env.MONGODB_URL;

const connectToMongo = async()=>{
    console.log("Connecting MongoDB");
    try {
        await mongoose.connect(MONGODB_URL);

        console.log("Connected to MongoDB")
    } catch (error) {
        console.error(error.message);
    }


}

module.exports = connectToMongo;