import React from 'react'
import { Route } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'

import Sidebar from './components/sidebar'
import Topbar from './components/topbar'
import Project from './Project/Project'
import Dashboard from './Dashboard/Dashboard'

import { me } from '../../graphql/queries'
import { AUTH_TOKEN, POLL_INTERVAL } from '../../utils/constants'

// Home: available to authorized users and establishes routing
class Home extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			isOpen: false
		}
		if(!localStorage.getItem(AUTH_TOKEN)){
			this.props.history.push(`/login`)
		} else if(!this.props.history.location.pathname.includes('/0/')) {
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
		this.setState({ isOpen: !this.state.isOpen })
	}
	
	// Todo: break sidebar into its own component
	render() {
		if (this.props.data.loading) {
    	return (<div>{this.props.children}</div>)
    }

		if (this.props.data.error) {
			return (<div>An unexpected error occurred</div>)
		}

		return (
			<Sidebar 
				user={this.props.data.me}
				toggleSidebar={this.toggleVisibility}
				isOpen={this.state.isOpen}>
				<Topbar toggleSidebar={this.toggleVisibility} history={this.props.history}/>
				<Route path='/0/projects/:projectid' component={Project} />
				<Route exact path='/0/' render={() => <Dashboard projects={this.props.data.me.projects} />} />
			</Sidebar>
		)
	}
}

export default compose(
	graphql(me),
)(Home)
