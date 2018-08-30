import React, { Component } from 'react'
import { CardColumn, Row, Card } from '../../../utils/anvil'
import EditableTask from './components/EditableTask'
import List from './components/List'
import { project } from '../../../graphql/queries'
import { updateTask } from '../../../graphql/mutations'
import { graphql, compose } from 'react-apollo'

import '../../../styles/index.css'

const getItems = (project) => {
	if (!project) { return [] }
	return [].concat(...project.sections.map(section => {
		return [].concat({ type: 'section', data: section }, ...section.tasks.map(task => {
			return { type: 'task', data: task }
		}))
	}))
}

// Project: Component used on the /projects/:id route
class Project extends Component {

	constructor(props) {
		super(props)
		this.state = {
			selectedItem: null,
			items: []
		}
	}

	static getDerivedStateFromProps(props, state) {
		state.items = props.data.project? getItems(props.data.project) : []
		return state
	}

	selectItem = (value) => {
		this.setState({selectedItem: value})
		this.props.data.refetch()
	}

	onChange = ({key, value}) => {
		let selectedItem = this.state.selectedItem
		if(!selectedItem || selectedItem.data[key] === value) { return }
		selectedItem.data = {...selectedItem.data, [key]: value}
		this.setState({ selectedItem })
		this.props.updateTask({
			variables: {
				id: selectedItem.data.id,
				[key]: value
			}
		})
	}

	render() {
		const { data } = this.props
		const { selectedItem } = this.state

		if (data.loading && !data.project) {
			return (<div>Loading</div>)
		}

		if (data.error) {
			return (<div>An unexpected error occurred</div>)
		}


		return (
			<div className='flex flex-row h-100'>
				<div className={`flex-auto ${selectedItem ? 'dn di-l di-m' : ''}`}>
					<Header className='mt2 ml2' title={data.project.title} /> 
					<List sections={data.project.sections} 
						selectItem={this.selectItem} />
				</div>
			{selectedItem &&
			<div className='pl2 pt2 vh-75 bl-ns flex-auto w-25' orderSm={-1}>
					<EditableTask
						item={selectedItem}
						onChange={this.onChange}
						selectItem={this.selectItem} />
			</div>}
			</div>
		)
	}
}

export default compose(
	graphql(project, {
		options: (props) => ({
			variables: {
				id: props.match.params.projectid
			}
		})
	}),
	graphql(updateTask, { name: 'updateTask'})
)(Project)


const Header = ({title, className}) => (
	<div className={className}>
		<h1 className='tl f3 b'>{title}</h1>
	</div>
)