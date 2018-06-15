import React from 'react'
import { arrayMove } from 'react-sortable-hoc'
import { ListItem} from '../../../../utils/anvil'
import KickitList from '../../../components/list'
import '../../../../styles/index.css'

// Project: Component used on the /projects/:id route
class ProjectList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
				project: null,
				items: [],
				selectedItem: null,
		}
  }

	shouldComponentUpdate(nextProps) {
		if (nextProps.data && nextProps.data.project && nextProps.data.project !== this.state.project) {
			this.setState({ 
				project: nextProps.data.project, 
				items: this.projectItems(nextProps.data.project) 
			})  	
			return true
		}
		return false
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
			<ListItem className={`item ${value.type === 'section' ? 'section' : 'task'}`}>
				<span className='title'><h4>{value.data.title}</h4></span>
				<span className='description'><p>{value.data.description}</p></span>
			</ListItem>
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

export default ProjectList