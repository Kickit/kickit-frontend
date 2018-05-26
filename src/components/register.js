import React from 'react';
import '../index.css';
import { AUTH_TOKEN } from '../constants'
import { Button, Input, Form } from 'semantic-ui-react'
import { graphql, compose } from 'react-apollo'
import logo from '../kickit_logo.png';
import gql from 'graphql-tag'


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
    }
  }
  
  attemptRegister = async () => {
    const { first, last, email, password } = this.state.userData
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

    this.props.history.push(`/0/`)
  }

  updateStep = (i) => {
    this.setState((prevState, props) => {
      return { step: prevState.step + i }
    })
  }

  handleChange(v, e) {
    let userData = {...this.state.userData}
    userData[v] = e.target.value
    this.setState( { userData } )
  }

  saveAuthData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  RegEmail = () => {
    return (
      <div className="container">
      <h3>Register</h3>
      <Form>
        <Form.Field>
          <Input value={this.state.userData.email} onChange={ this.handleChange.bind(this, 'email') } placeholder='Email' />
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
          <Input value={this.state.userData.first} onChange={ this.handleChange.bind(this, 'first') } placeholder='First Name' />
        </Form.Field>
        <Form.Field>
          <Input value={this.state.userData.last} onChange={ this.handleChange.bind(this, 'last') } placeholder='Last Name' />
        </Form.Field>
        <Form.Field>
          <Input value={this.state.userData.password} onChange={ this.handleChange.bind(this, 'password') } placeholder='Password' type="password" />
        </Form.Field>
        <Form.Field>
          <Button onClick={() => this.updateStep(-1)} color='blue'> {'<'} Back</Button>
          <Button type='submit' onClick={() => this.attemptRegister()} color='yellow'>Register</Button>
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

export default compose(
  graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),
)(Register)
