import React from 'react'
import { withRouter } from 'react-router-dom'

// Dashboard: Dashboard style setup with some grouping and visualizations
class Dashboard extends React.Component {
	render() {
		return (
			<div>
				Dashboard
				{/*TODO: @Foopert here is the projects prop, you can use these to populate the myProjects component*/}
				{this.props.projects.map( project => (<div key={project.id}>{project.title}</div>))}
			</div>
		)
	}

}
export default withRouter(Dashboard)
