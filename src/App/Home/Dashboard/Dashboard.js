import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Input, Form } from 'semantic-ui-react'
import { createProject } from '../../../graphql/mutations'
import { Mutation } from "react-apollo";

// Dashboard: Dashboard style setup with some grouping and visualizations

const defaultState = {
	editing: false,
}

// Change this buttons on click to trigger a create project.

// TODO: Replace button with "trigger" component
const CreateProject = ( {title, owners} ) => {

	let input;
	let editing = false;
	
  return (
	<Mutation mutation={createProject}>
		{(createProject, { data }) => (
			<div> 
				<Button circular icon='plus' className="h2.5 w2.5" onClick={() => { this.editing = true }} /> 
				<form
					onSubmit={e => {
						e.preventDefault();
						title = input.value;
						createProject({ variables: { owners, title } });
						input.value = "";
					}}
				>
				
					<input
						ref={node => {
							input = node;
						}}
					/>	
				</form>
			</div>
		)}
  </Mutation>
	
		  /*
    <Mutation mutation={createProject}>
      {(createProject, { data }) => (
		<Button circular icon='plus' className="h2.5 w2.5" onClick={() => createProject({ variables: { owners, title } })} />
      )}
	</Mutation>
	*/
  );
};





// Add button that sends "createProject" mutation request on click

// TODO: input Visible true!!!. when input visible is true, render add project input. 
// Stateful component: when you click this button, it will see. 

/*
class MenuAddProject extends Component {

	constructor(props) {
		super(props)
		this.state = {
			inputValue: ''
		}
	}

	handleChange(event) {
		this.setState({value: event.target.value})
	}

	render() {
		console.log("hello!");
	}

	// We dont need a form.
	render() {
		return (
			<Mutation mutation={createProject}>
			{(createProject, { data }) => (
					  <Button circular icon='plus' className="h2.5 w2.5" onClick={() => createProject({ variables: { owners, title } })} />
			)}
		  </Mutation>
		)
	}
	
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
	
	
}

*/

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
				<CreateProject title='hello' owners={[]} />
			</div>
		)
	}
}

export default withRouter(Dashboard)
