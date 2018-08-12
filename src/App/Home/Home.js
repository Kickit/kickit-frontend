import React from 'react'
import { Route } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'

import Layout from './components/layout'
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
	// Todo: break sidebar into its own component
	render() {
		if (this.props.data.loading) {
    	return (<div>{this.props.children}</div>)
    }

		if (this.props.data.error) {
			return (<div>An unexpected error occurred</div>)
		}

		const Main = () => (
			<div>
				<Route path='/0/projects/:projectid' component={Project} />
				<Route exact path='/0/' render={() => <Dashboard projects={this.props.data.me.projects} />} />
			</div>
		)
		return (
			<div>
			<Layout 
				isCollapsed={!this.state.isOpen}
				Main={Main} 
				Sidebar={() => <Sidebar user={this.props.data.me} />}
				Top={() => (
					<Topbar 
						user={this.props.data.me} 
						isOpen={this.state.isOpen} 
						toggle={() => this.setState({isOpen: !this.state.isOpen})} 
						history={this.props.history}
					/>)} 
				/>
			</div>
		)
	}
}

export default compose(
	graphql(me),
)(Home)