import React from 'react';
import '../index.css';
import { Button, Input } from 'semantic-ui-react'
import logo from '../kickit_logo.png';

const RegEmail = () => {
  return (
    <div className="container">
    <h3>Register</h3>
    <Input placeholder='Email' />
    <Button color='yellow'>Register</Button>
    </div>
  )
}


const Register = () => {
    return (
    <div className="register">
      <img src={logo} height={"300px"} width={"300px"} alt={""}/>
      <div className="inputModal">
        <RegEmail/>
      </div>
    </div>
  );
  };
  
  export default Register;
