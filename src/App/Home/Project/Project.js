import React from 'react'
import QueryList from './components/QueryList'
import { CardColumn } from '../../../utils/anvil'
import { POLL_INTERVAL } from '../../../utils/constants'
import { project } from '../../../graphql/queries'
import { updateTask } from '../../../graphql/mutations'
import { graphql, compose } from 'react-apollo'

import '../../../styles/index.css'

const KickitList = compose(
	graphql(project, {
		options: (ownProps) => ({
			variables: {
				id: ownProps.id
			},
			pollInterval: POLL_INTERVAL,
		})
	}),
	graphql(updateTask, { name: 'updateTask'})
)(QueryList)

// Project: Component used on the /projects/:id route
class Project extends React.Component {
	render() {
		return (
			<CardColumn>
				<KickitList id={this.props.match.params.projectid} location={this.props.location.pathname} />
			</CardColumn>
		)
	}
}

export default Project