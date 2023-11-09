import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{

    const Host = "http://localhost:5000";

    const notes =[  ]

const [Notes, setNotes] = useState(notes);

// Get all Notes
const getNotes = async ()=>{
    // API Call
    let url = `${Host}/api/notes/fetchallNotes/`

    try {
    
    const response = await fetch(url, {
      method: "GET",
  
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const jsonData = await response.json();
    // console.log(jsonData);
    setNotes(jsonData);

    } catch (error) {
      console.log(error.message);
    }


}


// Add a note
const addNote = async (title,description,tag)=>{
    // API Call
    let url = `${Host}/api/notes/addnote`;

    try {
      // console.log(localStorage.getItem('token'));

      const response = await fetch(url, {
        method: "POST",
    
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
    
        body: JSON.stringify({title,description,tag})
      });

      const Note = await response.json();

      setNotes(Notes.concat(Note));

    } catch (error) {
      console.log(error.message);
    }

}

// Delete a note
const deleteNote = async (id)=>{
    // API call
    let url = `${Host}/api/notes/delete/${id}`

    const response = await fetch(url, {
        method: "DELETE",
    
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
    
        // body: JSON.stringify({title,description,tag})
      });
    
    const jsonData = await response.json(); 

    console.log(jsonData);

    const newNote = notes.filter((note)=>{return note._id!==id})
    setNotes(newNote);
}

// Update a note
const editNote = async (id,title,description,tag)=>{
    // API call

    let url = `${Host}/api/notes/updatenote/${id}`;

    const response = await fetch(url, {
        method: "PUT",
    
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
    
        body: JSON.stringify({id,title,description,tag})
      });
    
      const jsonData = await response.json(); 
      console.log(jsonData);

      let newNotes = JSON.parse(JSON.stringify(notes))

    // Logic to edit note
    for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id){
            newNotes.title = title;
            newNotes.description= description;
            newNotes.tag = tag;
            break;
        }
    }
    setNotes(newNotes);
}

    return(
        <NoteContext.Provider value={{Notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;