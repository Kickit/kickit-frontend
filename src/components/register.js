import React from 'react';
import '../index.css';
import { Button, Input } from 'semantic-ui-react'

const RegEmail = () => {
  return (
    <div className="container">
    <Input placeholder='Email' />
    <Button color='yellow'>Register</Button>
    </div>
  )
}


const Register = () => {
    return (
    <div className="register">
      <div className="inputModal">
        <h3>Register</h3>
        <RegEmail/>
      </div>
    </div>
  );
  };
  
  export default Register;
