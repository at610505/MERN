const express = require("express");
const fetchUSer = require("../middleware/fetchUSer");
const Note = require("../models/notes");
const {body , validationResult} = require("express-validator");
const { route } = require("./auth");
const router = express.Router();


// Route 1: get all the notes
router.get('/fetchallNotes',fetchUSer,async (req,res)=>{

    try {

    const notes = await Note.find({user:req.user.id});
    // console.log(notes);

    res.json(notes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send({errorMessage:"Something went wrong"});
    }

})

// Route 2 : Add a new new note using POST "api/auth/addnote"
router.post('/addnote',fetchUSer,[
    
    body("title").isLength({min:3}).withMessage("Please enter a valid title"),
    body("description").isLength({min:5}).withMessage("Description should be atleast 10 Characters")

],async (req,res)=>{

    try {
        
        const { title,description,tag } = req.body;

        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({error: error.array()});
        }
    
        const note = new Note({
            title,description,tag, user: req.user.id

        });
        const savedNote = await note.save();

        res.json(savedNote)

    } catch (error) {
        
    console.error(error.message);
    res.status(500).json({error:"Internal Server Error"});

    }


})

// Update an existing note PUT "api/note/updatenote"
router.put("/updatenote/:id",fetchUSer,async (req,res)=>{

    try {
        
    const {title,description,tag} = req.body;
    // Create a newnote object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found");
    }

    if(note.user.toString()!== req.user.id){
        return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json(note);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Something went wrong");
    }

    
});

// Route 4 delete note "api/note/delete/:id" DELETE

router.delete("/delete/:id",fetchUSer,async (req,res)=>{

    try {
        
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }

        if(note.user.toString()!== req.user.id){
            return res.status(401).send("Not allowed");
        }

        let deletedNote = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note has been deleted successfully",note:deletedNote});

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Something went wrong");

    }
   
});

module.exports = router;