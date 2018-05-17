import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import Login from './login';
import Register from './register';
import './App.css';

const MyRouter = () => (
  <Router>
    <div className="nav-links">
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>

      <hr />

      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
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
