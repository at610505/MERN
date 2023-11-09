import React,{useContext} from "react";
import Col from "react-bootstrap/esm/Col";
import Card from 'react-bootstrap/Card';
import NoteContext from "../context/notes/noteContext";



function NoteItem(props){

    const notes = useContext(NoteContext);

    const {deleteNote} = notes;

    const { Note , handleShow} = props;

    // To run both function on 1 click
    const handleUpdateClick = ()=>{
        handleShow(Note._id);
    }

    return(
        <>
        <Col md={3} >
    <Card className="my-3">
      <Card.Body>
        <Card.Title>{Note.title}</Card.Title>
        <Card.Text> {Note.description} </Card.Text>
        <i className="fa-solid fa-trash-can fa-sm mx-2" onClick={()=>{deleteNote(Note._id); props.showAlert("Deleted Successfully","success")}}></i>
        <i className="fa-solid fa-pen-to-square mx-2" onClick={handleUpdateClick}></i>
      </Card.Body>
    </Card>
    </Col>
        </>
    )
}

export default NoteItem;