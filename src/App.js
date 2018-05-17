import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import Login from './login';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Link to="/login">Login</Link>
            <Route path="/login" component={Login} />
          </div>
        </Router>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Login/>
      </div>
    );
  }
}

export default App;
