import React, { Component } from 'react'
import QueryList from './components/QueryList'
import { CardColumn, Row, Card } from '../../../utils/anvil'
import EditableTask from './components/EditableTask'
import { project } from '../../../graphql/queries'
import { updateTask } from '../../../graphql/mutations'
import { graphql, compose } from 'react-apollo'

import '../../../styles/index.css'

const defaultState = {
	selectedItem: null,
	items: []
}

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
		this.state = defaultState
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
		if (this.props.data.loading && !this.props.data.project) {
			return (<div>Loading</div>)
		}

		if (this.props.data.error) {
			console.log(this.props.data.error)
			return (<div>An unexpected error occurred</div>)
		}

		return (
			<Row>
			<CardColumn phoneInvisible={!!this.state.selectedItem}>
				<QueryList
					items={this.state.items}
					selectedItem={this.state.selectedItem}
					selectItem={this.selectItem}
					onChange={this.onChange} />
			</CardColumn>
			{this.state.selectedItem &&
			<CardColumn orderSm={-1}>
				<Card>
					<EditableTask
						item={this.state.selectedItem}
						onChange={this.onChange}
						selectItem={this.selectItem} />
				</Card>
			</CardColumn>}
			</Row>
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
