import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";



function NavbarComponent ()  {

  const Navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    Navigate("/login");
  }

  return (
  <>
      <Navbar expand="lg" bg='dark' data-bs-theme='dark'>
        <Navbar.Brand href="/">iNotebook</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={"/"} className='nav-link'>Home</Link>
            <Link to={"/about"} className='nav-link'>About</Link>
          </Nav>
        </Navbar.Collapse>
        {!localStorage.getItem('token')? <div><Link to={"/login"}><Button type="submit" className='mx-1'>Login</Button></Link>
          <Link to={"/signup"}><Button type="submit" className='mx-1'>Sign Up</Button></Link></div>: <Link ><Button type="submit" className='mx-1' onClick={handleLogout}>Log Out</Button></Link>}

    </Navbar>
</>
)}

export default NavbarComponent;