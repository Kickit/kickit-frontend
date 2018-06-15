import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { graphql } from 'react-apollo'

import Nav from './components/nav'
import Topbar from './components/topbar'
import Project from './Project/Project'
import Dashboard from './Dashboard/Dashboard'

import { me } from '../../graphql/queries'
import { AUTH_TOKEN, POLL_INTERVAL } from '../../utils/constants'
import data from '../../utils/fixture'  //Fixture data to start with, will wire up later

const KickitSidebar = graphql(me, {
	options: (ownProps) => ({
	  variables: { pollInterval: POLL_INTERVAL }
	})
  })(Nav)

// Home: available to authorized users and establishes routing
class Home extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			isOpen: false,
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
		this.setState({ isOpen: !this.state.isOpen })
	}
	
	// Todo: break sidebar into its own component
	render() {
		return (
			<KickitSidebar isOpen={this.state.isOpen} toggleSidebar={this.toggleVisibility}>
				<Topbar toggleSidebar={this.toggleVisibility} history={this.props.history}/>
					<Switch>
						<Route path='/0/projects/:projectid' component={Project} />
						<Route path='/0/' render={Dashboard} />
					</Switch>
			</KickitSidebar>
		)
	}

}
export default Home
