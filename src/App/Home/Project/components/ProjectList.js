import React from 'react'
import { arrayMove } from 'react-sortable-hoc'
import { Icon } from 'semantic-ui-react'
import { Card, Row, Column, ListItem, media} from '../../../../utils/anvil'
import KickitList from '../../../components/list'
import '../../../../styles/index.css'

import { graphql, compose, Query } from 'react-apollo'
import { project } from '../../../../graphql/queries'

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

	componentWillReceiveProps(nextProps) {
		if (nextProps.data && nextProps.data.project) {
			this.setState({ 
				project: nextProps.data.project, 
				items: this.projectItems(nextProps.data.project) 
			})  	
		}
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
      // <PokemonCard pokemon={this.props.data.Pokemon} handleCancel={this.goBack}/>
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


export default ProjectList