import React from 'react'
import Sidebar from '../../components/sidebar'
import '../../../styles/index.css'

// Project: Component used on the /projects/:id route
class Nav extends React.Component {
	render() {
		if (this.props.data.loading) {
    	return (<div>{this.props.children}</div>)
    }

		if (this.props.data.error) {
			console.log(this.props.data.error)
			return (<div>An unexpected error occurred</div>)
		}
		return (
			<Sidebar 
				user={this.props.data.me}
				toggleSidebar={this.props.toggleSidebar}
				isOpen={this.props.isOpen}>
				{this.props.children}
			</Sidebar>
		)
  }
}

export default Nav