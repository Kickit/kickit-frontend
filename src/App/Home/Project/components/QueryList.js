import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Card, Row, ListItem } from '../../../../utils/anvil'
import EditableItem from './EditableItem';

import '../../../../styles/index.css'

// Project: Component used on the /projects/:id route
class QueryList extends React.Component {
	// TODO: @nicklewanowicz NEED to clean this garbage up
	listItem = ({ value }) => {
		return (
		<div onClick={() => this.props.selectItem(value)}>
			<Link to={`/0/projects/${this.props.match.params.projectid}/tasks/${value.data.id}`} >
				<ListItem className={`item ${value.type === 'section' ? 'section' : 'task'}`}>
					<Row>
						<EditableItem
							item={value}
							onChange={() => null} />
					</Row>
				</ListItem>
			</Link>
		</div>
		)
	}

	render() {
		return (
			<ProjectList>
				{this.props.items.map(item => (
					<this.listItem key={item.data.id} value={item}/>
				))}
			</ProjectList>
		)
	}
}

export default withRouter(QueryList)

// TODO: Make this more generic and add to anvil
const ProjectList = Card.extend`
    &.ui.segment {
        background: linear-gradient(135deg, rgba(30, 187, 202,0.4), rgba(235, 188, 167, 0.4));
        border-radius: 0.5rem;
        color: #FFFFFF;
        list-style: none;
        overflow-y: overlay;
    }
`