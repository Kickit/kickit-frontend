import React from 'react';
import '../index.css';
import { Button, Input, Form } from 'semantic-ui-react'
import logo from '../kickit_logo.png';

  class Register extends React.Component {
    constructor () {
      super()
      this.state = {
        step: 1,
        userData: {
          email: '',
          firstName: '',
          lastName: '',
          password: '',
        }
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
            <Button onClick={() => this.updateStep(1)} color='yellow'>Next {'>'}</Button>
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
            <Button onClick={() => this.updateStep(-1)} color='blue'> {'<'} Back</Button>
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
      let CurrScreen = this.RegEmail
      switch (this.state.step){
        case 1:
          CurrScreen = this.RegEmail
          break
        case 2:
          CurrScreen = this.RegNamePass
          break
        case 3:
          CurrScreen = this.RegThankyou
      }
      return (
        <div className="register">
          <img src={logo} height={"300px"} width={"300px"} alt={""}/>
          <div className="inputModal">
            <CurrScreen/>
          </div>
        </div>
      )
    }
  }
  
  export default Register;
