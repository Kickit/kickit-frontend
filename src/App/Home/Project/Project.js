import React from 'react'
import ProjectList from './components/ProjectList'
import { Column, media} from '../../../utils/anvil'
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
})(ProjectList)

// Project: Component used on the /projects/:id route
class Project extends React.Component {
	render() {
		return (
			<ListColumn style={{display: this.props.match.params.taskid ? '' : 'inherit'}}>
				<KickitList id={this.props.match.params.projectid} location={this.props.location.pathname} />
			</ListColumn>
		)
	}
}

// Todo: make this more generic or move somewhere
const ListColumn = Column.extend`
    flex: 1;
    ${media.phone`display: none;`}
`

export default Project