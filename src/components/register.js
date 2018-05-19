import React from 'react';
import '../index.css';
import { Button, Input, Form } from 'semantic-ui-react'
import logo from '../kickit_logo.png';

  class Register extends React.Component {
    constructor () {
      super()
      this.state = {
        step: 1,
      }
    }

    updateStep = (i) => {
      this.setState((prevState, props) => {
        return { step: prevState.step + i }
      })
    }

    RegEmail = () => {
      return (
        <div className="container">
        <h3>Register</h3>
        <Form>
          <Form.Field>
            <Input placeholder='Email' />
          </Form.Field>
          <Form.Field>
            <Button type='submit' onClick={() => this.updateStep(1)} color='yellow'>Next</Button>
          </Form.Field>
        </Form>
        </div>
      )
    }
    
    RegNamePass = () => {
      return (
        <div className="container">
        <h3>Register</h3>
        <Form>
          <Form.Field>
            <Input placeholder='First Name' />
          </Form.Field>
          <Form.Field>
            <Input placeholder='Last Name' />
          </Form.Field>
          <Form.Field>
            <Input placeholder='Password' type="password" />
          </Form.Field>
          <Form.Field>
            <Button type='submit' onClick={() => this.updateStep(1)} color='yellow'>Register</Button>
          </Form.Field>
        </Form>
        </div>
      )
    }

    RegThankyou = () => {
      return (
        <div className="container">
        <h3>Thankyou for Registering!</h3>
        <a> If you are not redirected to application click here</a>
        
        </div>
      )
    }

    render () {
      let CurrStep = this.RegEmail
      switch (this.state.step){
        case 1:
          CurrStep = this.RegEmail
          break
        case 2:
          CurrStep = this.RegNamePass
          break
        case 3:
          CurrStep = this.RegThankyou
      }
      return (
        <div className="register">
          <img src={logo} height={"300px"} width={"300px"} alt={""}/>
          <div className="inputModal">
            <CurrStep/>
          </div>
        </div>
      )
    }
  }
  
  export default Register;
