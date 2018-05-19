import React from 'react';
import { Button, Input, Form } from 'semantic-ui-react'
import logo from '../kickit_logo.png';

import '../index.css';
import 'semantic-ui-css/semantic.min.css';

const LoginModal = () => {
  return (
    <div className="container">
    <h3>Login</h3>
    <Form>
      <Form.Field>
        <Input placeholder='Email' />
      </Form.Field>
      <Form.Field>
        <Input placeholder='Password' type='password' />
      </Form.Field>
      <Form.Field>
        <Button type='submit' color='yellow'>Login</Button>
      </Form.Field>
    </Form>
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
