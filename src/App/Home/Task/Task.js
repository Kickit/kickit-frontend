import React from 'react'
import { Icon } from 'semantic-ui-react'
import { Card, Row, CardColumn} from '../../../utils/anvil'
import TaskDetails from '../../Home/Task/components/taskdetails'
import { POLL_INTERVAL } from '../../../utils/constants'
import { task } from '../../../graphql/queries'
import { updateTask } from '../../../graphql/mutations'
import { graphql, compose } from 'react-apollo'

import '../../../styles/index.css'

const MyTaskDetails = compose(
	graphql(task, {
		options: (ownProps) => ({
			variables: {
				id: ownProps.id
			},
			pollInterval: POLL_INTERVAL,
		})
	}),
	graphql(updateTask, {name: 'updateTask'})
)(TaskDetails)


class Task extends React.Component {
    close = () => {
        this.props.history.push('../')
    }
    render () {
			return (
				<CardColumn orderSm={-1}>
					<Card>
						<Row><Icon name='close' onClick={this.close}/></Row>
						<MyTaskDetails id={this.props.match.params.taskid} location={this.props.location.pathname} />
					</Card>
				</CardColumn>
			)
    }
}

export default Task