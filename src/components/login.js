import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { Button, Input, Form } from 'semantic-ui-react'
import logo from '../kickit_logo.png'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import '../index.css';
import 'semantic-ui-css/semantic.min.css';

/*
  Todo: @nicklewanowicz using localstorage for JWT session tokens. 
        MUST swap this to serverside sessions and client cookie auth
*/
const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

class Login extends React.Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: '',
  }

  _confirm = async () => {
    const { name, email, password } = this.state
    if (this.state.login) {
      const result = await this.props.loginMutation({
        variables: {
          email,
          password,
        },
      })
      const { token } = result.data.login
      this._saveUserData(token)
    } else {
      const result = await this.props.signupMutation({
        variables: {
          name,
          email,
          password,
        },
      })
      const { token } = result.data.signup
      this._saveUserData(token)
    }
    this.props.history.push(`/`)
  }
  
  attemptLogin = () => {
    console.log('Login attempted')
  }

  checkAuth = () => {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    if(false){}

  }

  LoginModal = () => {
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
          <Button type='submit' onClick={() => this.attemptLogin()}  color='yellow'>Login</Button>
        </Form.Field>
      </Form>
      </div>
    )
  }

  render () {
    let CurrScreen = this.LoginModal
    return (
      <div className="login">
        <img src={logo} height={"300px"} width={"300px"} alt={""}/>
        <div className="inputModal">
          <CurrScreen/>
        </div>
      </div>
    )
  }

}

export default compose(
  graphql(LOGIN_MUTATION, { name: 'loginMutation' }),
)(Login)
