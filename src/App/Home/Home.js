import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Sidenav from './components/sidenav'
import Topbar from './components/topbar'
import Project from './Project/Project'
import Dashboard from './Dashboard/Dashboard'

import { AUTH_TOKEN } from '../../utils/constants'
import data from '../../utils/fixture'  //Fixture data to start with, will wire up later
import styled from 'styled-components';

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
		} else if (props.location.pathname.includes('projects')) {
			//  #TODO: Change this to query backend for VALID auth_token
			let project = data.projects.filter( proj => {
				return proj.id === props.location.pathname.split('/')[3]
			})[0] || null
			this.state.selectedProject = project
		} else {
			this.props.history.push(`/0/`)
		}
		
	}

	// closeSidebar: specifically close the sidebar when user clicks away from it
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
		this.props.history.push(`/`)
	}
	
	// Todo: break sidebar into its own component
	render() {
		return (
			<Sidenav toggleSidebar={this.toggleVisibility} sidebar={this.state.sidebar} history={this.props.history} data={this.state.data}>
				<Topbar toggleSidebar={this.toggleVisibility} history={this.props.history}/>
				<Router>
					<Switch>
						<Route path='/0/projects/:projectid' render={() => <Project project={this.state.selectedProject}/>} />
						<Route path='/0/' render={() => <Dashboard project={this.state.data}/>} />
					</Switch>
				</Router>
			</Sidenav>
		)
	}

}
export default Home
