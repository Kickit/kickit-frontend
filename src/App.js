import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button } from 'semantic-ui-react'
import Header from './components/Header'
import Login from './components/login'
import Register from './components/register';
import Home from './components/Home/home'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Home} />
        </Switch>
        </Router>
        <div className="circle one">&nbsp;</div>
        <div className="circle three">&nbsp;</div>
        <div className="circle four">&nbsp;</div>
        <div className="circle five">&nbsp;</div>
        <div className="circle six">&nbsp;</div>
        <div className="circle seven">&nbsp;</div>
        <div className="circle eight">&nbsp;</div>
        <div className="circle nine">&nbsp;</div>
        <div className="circle ten">&nbsp;</div>
        <div className="circle eleven">&nbsp;</div>
        <div className="circle twelve">&nbsp;</div>
        <div className="circle thirteen">&nbsp;</div>
        <div className="circle fourteen">&nbsp;</div>
      </div>
    );
  }
}

export default App;
