import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Sidenav from './components/sidenav'
import Topbar from './components/topbar'
import Project from './Project/Project'
import Dashboard from './Dashboard/Dashboard'

import { AUTH_TOKEN } from '../../utils/constants'
import data from '../../utils/fixture'  //Fixture data to start with, will wire up later

// Home: available to authorized users and establishes routing
class Home extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			sidebar: false,
			data: data,
		}
		if(!localStorage.getItem(AUTH_TOKEN)){
			this.props.history.push(`/login`)
		} else {
			this.props.history.push(`/0/`)
		}
	}

	// setSidebar: specifically close the sidebar when user clicks away from it
	setSidebar = (state) => {
    if (this.state.sidebar) {
      this.setState({ sidebar: state });
    }
	}

	// toggleVisibility: Open and close sidebar
	toggleVisibility = () => {
		this.setState({ sidebar: !this.state.sidebar })
	}
	// goTo: simple helper to goto a given route
	goTo = (route) => {
		this.props.history.push(route)
	}
	
	// Todo: break sidebar into its own component
	render() {
		return (
			<Sidenav 
				toggleSidebar={this.toggleVisibility}
				sidebar={this.state.sidebar}
				history={this.props.history}
				data={this.state.data}>
				<Topbar toggleSidebar={this.toggleVisibility} location={this.props.location.pathname} history={this.props.history}/>
					<Switch>
						<Route path='/0/projects/:projectid' component={Project} />
						<Route path='/0/' render={Dashboard} />
					</Switch>
			</Sidenav>
		)
	}

}
export default Home
