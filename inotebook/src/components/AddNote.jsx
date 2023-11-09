import React, {useContext, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import NoteContext from "../context/notes/noteContext";

const AddNote = (props)=>{

    const notes = useContext(NoteContext);

    const {addNote} = notes;

    const [note,setNote] = useState({title:"",description:"",tag:""});


    const onTitleChange = (e) => {
        
        setNote({ ...note, title: e.target.value });

      };
      

    const onDescriptionChange = (e)=>{

        setNote({...note, description : e.target.value})

    }

    const onTagChange = (e)=>{
        setNote({...note, tag : e.target.value });
    }

    const handleAddNote = (e)=>{

        e.preventDefault();

        // console.log(note);

        // Call the addNote function with the note object
        addNote(note.title, note.description, note.tag);

        // Showing Alert
        props.showAlert("Note Added Successfully","success");

        // Clear the input fields after adding the note
        setNote({ title: "", description: "", tag: "" });

    }


    return(

        <>
      <h1> Add a Note</h1>
      <Container>
      <Form >
      <Form.Group className="mb-3" controlId={"title"}>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Title" value={note.title} onChange={onTitleChange} minLength={5} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description" value={note.description} onChange={onDescriptionChange} minLength={5} required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="tag">
        <Form.Label>Tag</Form.Label>
        <Form.Control type="text" placeholder="tag" value={note.tag} onChange={onTagChange} minLength={5} required/>
      </Form.Group>
      <Button disabled={note.title.length <5 || note.description.length < 5} variant="primary" onClick={handleAddNote}>
        Add Note
      </Button>
    </Form>
    </Container>
        </>

    )
}

export default AddNote;