import './App.css';
import {
BrowserRouter,
Routes,
Route} 
from "react-router-dom";
import NavbarComponent  from './components/NavbarComponent';
import Home from './components/Home';
import About from "./components/About";
import Login  from './components/Login';
import SignUp from './components/SignUp';
import Container from 'react-bootstrap/Container';
import NoteState from './context/notes/noteState';
import AlertMessage from './components/AlertMessage';
import { useState } from 'react';

function App() {

  const [alert,setAlert] = useState({
    msg:null,
    type:null,
    show:false
  });

  function showAlert(message,type){
    setAlert({
      msg:message,
      type:type,
      show:true
    });

    setTimeout(()=>{
      setAlert({
        msg:null,
        type:null,
        show:false
      });
    },1500);

  }

  return (
    <div className="App">
      <BrowserRouter>
      <NoteState>
      <NavbarComponent/>
      <AlertMessage alert={alert}/>
      <Container>
        <Routes>
          <Route path='/' element={<Home showAlert={showAlert}/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/login' element={<Login showAlert={showAlert}/>}/>
          <Route path='/signup' element={<SignUp showAlert={showAlert}/>}/>
        </Routes>
        </Container>
      </NoteState>
      </BrowserRouter>
    </div>
  );
}

export default App;
