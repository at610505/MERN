const mongoose = require("mongoose");
const moment = require("moment")

const NoteSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    title:{
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true,
    },
    tag: {
        type: String,
        default: "General"
    },
    date:{
        type : String,
        default : moment().format('MMMM Do YYYY, h:mm:ss a')
    }
});

module.exports = mongoose.model("notes",NoteSchema)