import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import { AUTH_TOKEN } from '../../utils/constants'
import logo from '../../images/kickit_logo.png'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'
import ErrorModal from './components/ErrorModal'


import { graphql, compose } from 'react-apollo'
import { login, signup } from '../../graphql/auth'

import '../../styles/index.css';
import 'semantic-ui-css/semantic.min.css';

//Todo @nicklewanowicz add check to see if they have a valid JWT token
//     and tranition them automatically
class Login extends React.Component {
  state = {
      register: this.props.match.path.includes('register'),
      step: 1,
      email: '',
      first: '',
      last: '',
      password: '',
      error: '',
    }
  
  shouldComponentUpdate(nextProps, nextState) {
    nextState.register = nextProps.match.path.includes('register')
    return true
  }
  //Triggered by login button
  attemptLogin = async () => {
    const { email, password } = this.state
    try {
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
  handleChange = ({ target: {name, value} = {} }) => {
    this.setState({[name]: value});
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

  render () {
    return (
      <span>
        <div className="nav-links">
          <Link to="/login"><Button basic color='blue'>Login</Button></Link>
          <Link to="/register"><Button color='yellow'>Register</Button></Link>
        </div>
        <div className="login">
          <img src={logo} height={"300px"} width={"300px"} alt={""}/>
          <ErrorModal error={this.state.error} />
          <div className="inputModal">
            <div className="container">
              {
                !this.state.register &&
                <LoginModal 
                  state={this.state}
                  handleChange={this.handleChange}
                  attemptLogin={this.attemptLogin}/>
              }
              {
                this.state.register &&
                <RegisterModal 
                  handleChange={this.handleChange}
                  state={this.state}
                  updateStep={this.updateStep}
                  attemptRegister={this.attemptRegister}/>
              }
            </div>
          </div>
        </div>
      </span>
    )
  }
}

export default compose(
  graphql(signup, { name: 'signupMutation' }),
  graphql(login, { name: 'loginMutation' }),
)(Login)
