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
      </div>
    );
  }
}

export default App;
