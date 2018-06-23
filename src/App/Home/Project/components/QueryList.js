import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { arrayMove } from 'react-sortable-hoc'
import { ListItem } from '../../../../utils/anvil'
import KickitList from '../../../components/list'
import EditableItem from '../components/EditableItem'
import '../../../../styles/index.css'

// Project: Component used on the /projects/:id route
class QueryList extends React.Component {
	projectItems(project) {
		if (!project) { return [] }
		return [].concat(...project.sections.map(section => {
			return [].concat({ type: 'section', data: section }, ...section.tasks.map(task => {
				return { type: 'task', data: task }
			}))
		}))
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState({
			items: arrayMove(this.state.items, oldIndex, newIndex)
		})
	}
	// TODO: @nicklewanowicz NEED to clean this garbage up
	listItem = ({ value }) => (
		<div onClick={() => this.props.selectItem(value)}>
			<Link to={`/0/projects/${this.props.match.params.projectid}/tasks/${value.data.id}`} >
				<ListItem className={`item ${value.type === 'section' ? 'section' : 'task'}`}>
					{value.type === 'task' &&
						<EditableItem value={value} onChange={this.props.onChange} />
					}
					{value.type === 'section' &&
						<span>{value.data.title}</span>
					}
				</ListItem>
			</Link>
		</div>
	)

	render() {

		if (this.props.data.loading) {
			return (<div>Loading</div>)
		}

		if (this.props.data.error) {
			console.log(this.props.data.error)
			return (<div>An unexpected error occurred</div>)
		}
		return (
			<KickitList
				itemTemplate={this.listItem}
				items={this.projectItems(this.props.data.project)}
				onSortEnd={this.onSortEnd}
			/>
		)
	}
}

export default withRouter(QueryList)