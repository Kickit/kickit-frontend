import React from 'react'
import QueryList from './components/QueryList'
import { CardColumn } from '../../../utils/anvil'
import { POLL_INTERVAL } from '../../../utils/constants'
import { project } from '../../../graphql/queries'
import { graphql } from 'react-apollo'

import '../../../styles/index.css'

const KickitList = graphql(project, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.id
		},
		pollInterval: POLL_INTERVAL,
  })
})(QueryList)

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