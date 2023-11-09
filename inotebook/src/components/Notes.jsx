import React, { useContext, useEffect, useState } from "react";
import {  useNavigate  } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import NoteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

function Notes(props) {
  const notes = useContext(NoteContext);
  const Navigate = useNavigate();

  const { Notes, getNotes, editNote } = notes;

  const [note, setNote] = useState({id:"", title: "", description: "", tag: "" }); // Note state for updating the note

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      Navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  // For modal to pop up
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (ID) => {
    setShow(true);
    setNote({...note, id : ID});    
  };

  const updateNote = () => {

    // calling updateNote

    editNote(note.id,note.title,note.description,note.tag);

    props.showAlert("Updated Successfully","success");

    // clearing the note
    setNote({ title: "", description: "", tag: "" });

    setShow(false);
  };

  // For modal form

  const onTitleChange = (e) => {
    setNote({ ...note, title: e.target.value });
  };

  const onDescriptionChange = (e) => {
    setNote({ ...note, description: e.target.value });
  };

  const onTagChange = (e) => {
    setNote({ ...note, tag: e.target.value });
  };

  return (
    <div>
      <Container>
        <AddNote showAlert={props.showAlert}/>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Form >
          <Modal.Body>
              <Form.Group className="mb-3" controlId={"title"}>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  value={note.title}
                  onChange={onTitleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  value={note.description}
                  onChange={onDescriptionChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="tag">
                <Form.Label>Tag</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="tag"
                  value={note.tag}
                  onChange={onTagChange}
                />
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={updateNote} disabled={note.title.length < 5 || note.description.length < 5}>
              Update Note
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
          </Form>
        </Modal>

        <h1>Your Notes</h1>
        <Row>
          {Notes.length === 0 ? "Nothing to show here" : Notes.map((Note, index) => {
            return (
              <NoteItem
                Note={Note}
                updateNote={updateNote}
                handleShow={handleShow}
                key={index}
                showAlert = {props.showAlert}
              />
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default Notes;
