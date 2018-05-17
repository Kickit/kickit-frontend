import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import Login from './login';
import './App.css';

const MyRouter = () => (
  <Router>
    <div>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>

      <hr />

      <Route path="/login" component={Login} />
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
