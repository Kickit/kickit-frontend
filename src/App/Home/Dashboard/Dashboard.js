import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Input, Form } from 'semantic-ui-react'
import { createProject } from '../../../graphql/mutations'

// Dashboard: Dashboard style setup with some grouping and visualizations

const defaultState = {
	editing: false,
}

// Add button that sends "createProject" mutation request on click
class MenuAddProjectButton extends Component {

	constructor(props) {
		super(props)
		this.state = defaultState
	}

	/*
	render() {
		if (this.props.editing) {
			return (<div>Loading</div>)
		}
	}
	*/

	toggleEdit() {
		this.setState({
			editing: !this.state.editing,
		})
	}

	buttonCreateProject() {
		this.props.createProject({
			string: "MyMemesTitle"
		})
	}

	render() {
		return (
		<div>
			<Button circular icon='plus' className="h2 w2" onClick={() => this.toggleEdit()} />
			{this.state.editing && 
				<Form onSubmit={() => this.buttonCreateProject()}>
					<Input placeholder='Project title' />
				</Form>
			}
		</div>
		)
	}

	/*
	render() {
		return (
		<div>
			<Button circular icon='plus' className="h2 w2" onClick={() => this.toggleEdit()} />
			{this.state.editing && 
				<Form onSubmit={() => console.log('memes')}>
					<Input placeholder='Project title' />
				</Form>
			}
		</div>
		)
	}
	*/
}

/*
const MenuAddProjectButton = () => {
	
	let editing = false
	
	return (
		<div>
			<Button circular icon='plus' className="h2 w2" onClick={() => { this.editing = true }} />
			{
				editing && <Input placeholder='Search...' />
			}
		</div>
	)
}
*/

class Dashboard extends React.Component {
	render() {
		return (
			<div>
                Dashboard
				<MenuAddProjectButton/>
			</div>
		)
	}

}

const funcs = {
	
}
export default withRouter(Dashboard)
