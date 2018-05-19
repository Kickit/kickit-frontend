import React from 'react';
import { Button, Input } from 'semantic-ui-react'
import logo from '../kickit_logo.png';

import '../index.css';
import 'semantic-ui-css/semantic.min.css';

const LoginModal = () => {
  return (
    <div className="container">
    <h3>Login</h3>
    <Input placeholder='Email' />
    <Input placeholder='Password' type='password' />
    <Button color='yellow'>Login</Button>
    </div>
  )
}


const Login = () => {
    return (
      <div className="login">
        <img src={logo} height={"300px"} width={"300px"} alt={""}/>
        <div className="inputModal">
          <LoginModal/>
        </div>
      </div>
    );
  };
  
  export default Login;
