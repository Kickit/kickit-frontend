import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Project from './Project/Project'
import  { Row, media } from '../../utils/anvil'
import Sidenav from './components/sidenav'
import Topbar from './components/topbar'
import styled, { css } from 'styled-components'
import '../../styles/index.css'

import { 
	Button, Input, Form, 
	Message, Sidebar, Segment, 
	Menu, Image, Icon, 
	Header, Label, Divider 
} from 'semantic-ui-react'


import { AUTH_TOKEN } from '../../utils/constants'
import logo from '../../images/kickit_logo.png'
import data from '../../utils/fixture'  //Fixture data to start with, will wire up later

// Home: Dashboard style setup with some grouping and visualizations
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
			//  #TODO: Change this to query backend for VALID auth_token
			let project = data.projects.filter( proj => {
				return proj.id === props.location.pathname.split('/')[2]
			})[0] || null
			this.state.selectedProject = project
		}
		
	}
	
	
	// goToProject: function to manage navigation to project route
	goToProject = (project) => {
		this.setState({ selectedProject: project });
		this.props.history.push(`/projects/${project.id}`)
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
			<Sidenav toggleSidebar={this.toggleVisibility} sidebar={this.state.sidebar} data={this.state.data}>
				<Topbar toggleSidebar={this.toggleVisibility} history={this.props.history}/>
					<Switch>
						<Route path='/projects/:projectid' render={() => <Project project={this.state.selectedProject}/>} />
					</Switch>
			</Sidenav>
		)
	}

}


export default Home
