import React from 'react'
import { AUTH_TOKEN } from '../../utils/constants'
import { Button, Input, Form, Message } from 'semantic-ui-react'
import logo from '../../images/kickit_logo.png'
import Header from '../components/header'

import { graphql, compose } from 'react-apollo'
import { login, signup } from '../../graphql/auth'

import '../../styles/index.css';
import 'semantic-ui-css/semantic.min.css';


//Todo @nicklewanowicz add check to see if they have a valid JWT token
//     and tranition them automatically
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      register: props.match.path.includes('register'),
      email: '',
      first: '',
      last: '',
      password: '',
      error: '',
    }
  }

  // Will set weather the login or register modal is visable
  shouldComponentUpdate(nextProps, nextState){
    let register = nextProps.match.path.includes('register')
    if(register !== this.state.register){
      this.setState({register})
    }
    return true
  }

  //Renders Modal frame with "CurrScreen" inside.
  render () {
    let CurrScreen = this.LoginModal
    if (this.state.register) {
      switch (this.state.step){
        case 1:
          CurrScreen = this.RegEmail
          break
        case 2:
          CurrScreen = this.RegNamePass
          break
        case 3:
          CurrScreen = this.RegThankyou
          break
        default: 
          CurrScreen = this.RegEmail
      }
    }
    return (
      <span>
        <Header/>
        <div className="login">
          <img src={logo} height={"300px"} width={"300px"} alt={""}/>
          <this.ErrorMessage error={this.state.error} />
          <div className="inputModal">
            <CurrScreen/>
          </div>
        </div>
      </span>
    )
  }

  // RegEmail: Email form
  RegEmail = () => {
    return (
      <div className="container">
      <h3>Register</h3>
      <Form>
        <Form.Field>
          <Input 
            value={this.state.email} 
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
  
  // RegNamePass: First/last name and password form
  RegNamePass = () => {
    return (
      <div className="container">
      <h3>Register</h3>
      <Form>
        <Form.Field>
          <Input 
            value={this.state.first} 
            onChange={ this.handleChange.bind(this, 'first') } 
            placeholder='First Name' 
          />
        </Form.Field>
        <Form.Field>
          <Input 
            value={this.state.last} 
            onChange={ this.handleChange.bind(this, 'last') } 
            placeholder='Last Name' 
          />
        </Form.Field>
        <Form.Field>
          <Input 
            value={this.state.password} 
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

  // RegThankyou: Thankyou message
  RegThankyou = () => {
    return (
      <div className="container">
      <h3>Thankyou for Registering!</h3>
      <a> If you are not redirected to application click here</a>
      
      </div>
    )
  }

  //Triggered by login button
  attemptLogin = async () => {
    const { email, password } = this.state
    try {
      console.log()
      const result = await this.props.loginMutation({
        variables: {
          email,
          password,
        },
      })
      const { token } = result.data.login
      this.saveAuthData(token)
      this.props.history.push(`/`)
    } catch (e) {
      this.setState((prevState, props) => {
        return {error: "The username or password is not correct."}
      })
    }
  }

  //  Will trigger signup mutation and either display error or transition to /0/
  attemptRegister = async () => {
    const { first, last, email, password } = this.state

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

  //Updates state on text input
  handleChange(v, e) {
    this.setState({ [v]: e.target.value });
  }

  saveAuthData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  //Moves you to the next registration step
  updateStep = (i) => {
    this.setState((prevState, props) => {
      return { step: prevState.step + i }
    })
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

  //2 input boxes for email and password and a button 
  LoginModal = () => {
    return (
      <div className="container">
      <h3>Login</h3>
      <Form>
        <Form.Field>
          <Input 
            value={this.state.email} 
            onChange={ this.handleChange.bind(this, 'email') } 
            placeholder='Email' />
        </Form.Field>
        <Form.Field>
          <Input 
            value={this.state.password} 
            onChange={ this.handleChange.bind(this, 'password') } 
            placeholder='Password' 
            type='current-password' />
        </Form.Field>
        <Form.Field>
          <Button 
            type='submit' 
            onClick={() => this.attemptLogin()}  
            color='yellow'>Login</Button>
        </Form.Field>
      </Form>
      </div>
    )
  }
}

export default compose(
  graphql(signup, { name: 'signupMutation' }),
  graphql(login, { name: 'loginMutation' }),
)(Login)
