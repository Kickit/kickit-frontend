import React from 'react'
import { Icon } from 'semantic-ui-react'
import { Card, Row, Column, media} from '../../../utils/anvil'
import ProjectList from './components/ProjectList'
import { project } from '../../../graphql/queries'
import { graphql } from 'react-apollo'


import '../../../styles/index.css'


const KickitList = graphql(project, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.id
    }
  })
})(ProjectList)

// TaskDetails: Full information related to the task 
const TaskDetails = ({task, close}) => {
	if (task) {
		return (
			<Card>
				<Row><Icon name='close' onClick={()=> close(null)}/></Row>
				<h1>{task.data.title}</h1>
				<p>{task.data.description}</p>
			</Card>
		)
	} else {
		return null
	}
}

// Project: Component used on the /projects/:id route
class Project extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
				id: props.id
		}
  }
	
	render() {
		return (
			<Row>
				<ListColumn style={{display: this.state.selectedItem ? '' : 'inherit'}}>
					<KickitList id={this.props.id} />
				</ListColumn>
				<DetailColumn style={{display: this.state.selectedItem ? '' : 'none'}}>
					<TaskDetails 
						close={e => this.selectItem(e)} 
						task={this.state.selectedItem}/>
				</DetailColumn>
		    </Row>
		)
	}
}

const ListColumn = Column.extend`
    flex: 1;
    ${media.phone`display: none;`}
`
const DetailColumn = Column.extend`
    flex: 1;
`


export default Project