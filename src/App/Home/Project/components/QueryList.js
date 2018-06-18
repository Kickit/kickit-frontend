import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { arrayMove } from 'react-sortable-hoc'
import { ListItem } from '../../../../utils/anvil'
import KickitList from '../../../components/list'
import EditableItem from '../components/EditableItem'
import '../../../../styles/index.css'

// Project: Component used on the /projects/:id route
class QueryList extends React.Component {
	state = {
		project: null,
		items: [],
		selectedItem: null,
	}

	shouldComponentUpdate(nextProps) {
		if (nextProps.data && nextProps.data.project && nextProps.data.project !== this.state.project) {
			this.setState({ 
				project: nextProps.data.project, 
				items: this.projectItems(nextProps.data.project) 
			})  	
		}
		return true
	}

	projectItems(project) {
		if( !project ){return []}
		return [].concat(...project.sections.map( section => {
			return [].concat({type: 'section', data: section}, ...section.tasks.map( task => {
					return {type:'task', data: task}
			}))
		}))
	}

	selectItem(item) {
		this.setState({selectedItem: item})
	}

	onSortEnd = ({oldIndex, newIndex}) => {
		this.setState({
			items : arrayMove(this.state.items, oldIndex, newIndex)
		})
	}

	listItem = ({ value }) => (
		<div onClick={()=> this.selectItem(value)}>
			<Link to={`/0/projects/${this.props.match.params.projectid}/tasks/${value.data.id}`} >
			<ListItem className={`item ${value.type === 'section' ? 'section' : 'task'}`}>
				{value.type === 'task' &&
					<EditableItem value={value} updateTask={(options) => this.props.updateTask(options)}/>
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
				items={this.state.items} 
				onSortEnd={this.onSortEnd}
			/>
		)
	}
}

export default withRouter(QueryList)