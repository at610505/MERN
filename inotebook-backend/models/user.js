const mongoose = require("mongoose");
const moment = require("moment");

const UserSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type: String,
        required : true
    },
    date : {
        type : String,
        default : moment().format('MMMM Do YYYY, h:mm:ss a')
    }
});

const User = mongoose.model("user",UserSchema);

module.exports = User;