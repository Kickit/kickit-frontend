import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'
import logo from './logo.svg';
import Login from './components/login';
import Register from './components/register';
import './App.css';

const MyRouter = () => (
  <Router>
    <div className="application">
    <div className="nav-links">
      <Button><Link to="/login">Login</Link></Button>
      <Button><Link to="/register">Register</Link></Button>

    </div>
    <div className="outlet">
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </div>
    </div>
  </Router>
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyRouter/>
      </div>
    );
  }
}

export default App;
