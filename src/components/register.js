import React from 'react';
import '../index.css';
import { AUTH_TOKEN } from '../constants'
import { Button, Input, Form, Message } from 'semantic-ui-react'
import { graphql, compose } from 'react-apollo'

import Header from './Header'
import logo from '../kickit_logo.png';
import gql from 'graphql-tag'


//Mutation definition matching with server 'signup' mutation
const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $first: String!, $last: String!) {
    signup(first: $first, last: $last, email: $email, password: $password) {
      token
    }
  }
`

class Register extends React.Component {
  state = {
    step: 1,
    userData: {
      email: '',
      first: '',
      last: '',
      password: '',
    },
    error: ''
  }
  
  //Triggered by the login button
  //  Will trigger signup mutation and either display error or transition to /0/
  attemptRegister = async () => {
    const { first, last, email, password } = this.state.userData

    try {
      const result = await this.props.signupMutation({
        variables: {
          first,
          last,
          email,
          password,
        },
      })
      const { token } = result.data.signup
      this.saveAuthData(token)
  
      this.props.history.push(`/`)
    } catch (e) {
      this.setState((prevState, props) => {
        return {error: e.message.split(':')[1], step: 1}
      })
    }
  }

  //Moves you to the next registration step
  updateStep = (i) => {
    this.setState((prevState, props) => {
      return { step: prevState.step + i }
    })
  }

  //Updates state on user input
  handleChange(v, e) {
    let userData = {...this.state.userData}
    userData[v] = e.target.value
    this.setState( { userData } )
  }

  saveAuthData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  //Generic Error 'message' component
  ErrorMessage = (error) => {
    if(error.error !== ""){
      return (
        <Message warning>
          <Message.Header>Opps!</Message.Header>
          <p>{error.error}</p>
        </Message>
      )
    }
    return ''
  }
  
  RegEmail = () => {
    return (
      <div className="container">
      <h3>Register</h3>
      <Form>
        <Form.Field>
          <Input 
            value={this.state.userData.email} 
            onChange={ this.handleChange.bind(this, 'email') } 
            placeholder='Email' 
          />
        </Form.Field>
        <Form.Field>
          <Button 
            onClick={() => this.updateStep(1)} 
            color='yellow'>Next {'>'}</Button>
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
          <Input 
            value={this.state.userData.first} 
            onChange={ this.handleChange.bind(this, 'first') } 
            placeholder='First Name' 
          />
        </Form.Field>
        <Form.Field>
          <Input 
            value={this.state.userData.last} 
            onChange={ this.handleChange.bind(this, 'last') } 
            placeholder='Last Name' 
          />
        </Form.Field>
        <Form.Field>
          <Input 
            value={this.state.userData.password} 
            onChange={ this.handleChange.bind(this, 'password') } 
            placeholder='Password' type="password" 
          />
        </Form.Field>
        <Form.Field>
          <Button 
            onClick={() => this.updateStep(-1)} 
            color='blue'> 
            {'<'} Back
          </Button>
          <Button 
            type='submit' 
            onClick={() => this.attemptRegister()} 
            color='yellow'>Register</Button>
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

  //based on the 'step' will display the appropriate input fields
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
      <span>
        <Header />
        <div className="register">
          <img src={logo} height={"300px"} width={"300px"} alt={""}/>
          <this.ErrorMessage error={this.state.error} />
          <div className="inputModal">
            <CurrScreen/>
          </div>
        </div>
      </span>
    )
  }
}

export default compose(
  graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),
)(Register)
