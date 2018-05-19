import React from 'react';
import '../index.css';
import { Button, Input } from 'semantic-ui-react'
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
        <Input placeholder='Email' />
        <Button onClick={() => this.updateStep(1)} color='yellow'>Next</Button>
        </div>
      )
    }
    
    RegNamePass = () => {
      return (
        <div className="container">
        <h3>Register</h3>
        <Input placeholder='First Name' />
        <Input placeholder='Last Name' />
        <Input placeholder='Password' />
        <Button color='yellow'>Register</Button>
        </div>
      )
    }

    RegNamePass = () => {
      return (
        <div className="container">
        <h3>Register</h3>
        <Input placeholder='First Name' />
        <Input placeholder='Last Name' />
        <Input placeholder='Password' />
        <Button color='yellow'>Register</Button>
        </div>
      )
    }

    render () {
      let CurrStep = this.RegEmail
      if(this.state.step === 1 ){
        CurrStep = this.RegEmail
      } else if(this.state.step === 2){
        CurrStep = this.RegNamePass
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
