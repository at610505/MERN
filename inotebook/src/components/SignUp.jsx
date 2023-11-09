import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SignUp(props) {

  const [user,setUser] = useState({fullName:"",email:"",password:""});
  const Host = "http://localhost:5000";
  const navigate = useNavigate();

  const handleSignUp = async (e) => {

    e.preventDefault();

    let url = `${Host}/api/auth/createUser`;

    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name:user.fullName,email:user.email,password:user.password})
    });
    const jsonData = await response.json();
    console.log(jsonData);
    
     setUser({fullName:"",email:"",password:""});

    if(jsonData.success){
      // Save the auth token and redirect
      localStorage.setItem('token',jsonData.authToken);
      props.showAlert("Account has been created Successfully","success");
      navigate("/");
    }else{
      props.showAlert("Invalid Details","danger");
    }  
  };

  return (
    <Form onSubmit={handleSignUp}>
      <Form.Group className="mb-3" controlId="Name">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Full Name"  onChange={(e)=>{setUser({...user,fullName:e.target.value})}} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setUser({...user,email:e.target.value})}}  required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>{setUser({...user,password:e.target.value})}} minLength={5} required/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
}

export default SignUp;