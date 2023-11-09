const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");
const { log } = require("console");

connectToMongo();


const app = express();
const port = 5000;

// middleware
app.use(express.json())
app.use(cors());

//Default routes

app.use('/api/auth',require("./routes/auth"));
app.use('/api/notes',require("./routes/note"));

app.listen(port,()=>{
    console.log(`Listening on Port : ${port}`);
})