import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Button } from 'semantic-ui-react'

class Header extends Component {
  render() {
    return (
        <div className="nav-links">
        <Link to="/login"><Button basic color='blue'>Login</Button></Link>
        <Link to="/register"><Button color='yellow'>Register</Button></Link>
        </div>
    )
  }
}

export default withRouter(Header)