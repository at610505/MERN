import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";


const Login = (props) => {

  const [credentials,setCredentials] = useState({email:"",password:""});
  const Host = "http://localhost:5000";
  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    let url = `${Host}/api/auth/login`;

    const response = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email:credentials.email,password:credentials.password})
    });
    const jsonData = await response.json();
    console.log(jsonData);
    setCredentials({email:"",password:""})
    if(jsonData.success){
      // Save the auth token and redirect
      localStorage.setItem('token',jsonData.authToken);
      
      props.showAlert("Logged In Successfully","success");

      navigate("/");
    }else{
      props.showAlert("Invalid Credentials","danger");
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setCredentials({...credentials,email:e.target.value})}}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword" >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>{setCredentials({...credentials,password:e.target.value})}}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Login;
