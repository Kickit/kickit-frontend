import React from 'react'
import { Button, Sidebar, Segment, Menu, Icon, Divider, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { createProject } from '../../graphql/mutations'
import  { AnvilSidebar } from '../../utils/anvil'


// Add button that sends "createProject" mutation request on click
const MenuAddProjectButton = ({createProject}) => {

	const handleRef = (c) => {
		this.inputRef = c
	}
	
	const focus = () => {
		this.inputRef.focus()
	}
	
	let editing = false
	
	return (
		<div>
			<Button circular icon='plus' className="h2.5 w2.5" onClick={() => { this.editing = true }} />
			{
				editing && 
				<Input ref={this.handleRef} placeholder='Search...' />
			}
		</div>
	)
}
class Sidenav extends React.Component {
	render() {
		return (
			<AnvilSidebar.Pushable as={Segment} >
				<Sidebar
					as={Menu}
					animation='push'
					width='wide'
					visible={this.props.isOpen}
					icon='labeled'
					onClick={this.props.toggleSidebar} vertical inverted>
					<UserInfo user={this.props.user} />
					<MenuProjects projects={this.props.user.projects}/>
				</Sidebar>
				<Sidebar.Pusher style={{height: '100VH', display: 'flex', flexFlow: 'column'}}>
					{this.props.children}
				</Sidebar.Pusher>
			</AnvilSidebar.Pushable>
		)
	}
}


// Will need to break these out to its own component

// MenuProjects: piece to populated projects for a user
const MenuProjects = ({ projects }) => {
	return projects.map( project => {
		return (
			<Link key={project.id} to={`/0/projects/${project.id}`}>
			<Menu.Item name={project.title} position='left'>
				<p>{project.title}<Icon name='angle right' inverted={true} size='small' /></p>
			</Menu.Item>
			{/*<MenuAddProjectButton createProject={() => console.log('memes')}/>*/}
			<MenuAddProjectButton/>
			</Link>
		)
	})
}

// UserInfo: piece to populate account information of sidebar
const UserInfo = ({ user }) => {
	return (
		<UserCard>
			<h4><Icon name='user outline' size='small' />{user.first} {user.last}</h4>
			<p>{user.email}</p>
			<Divider inverted/>
		</UserCard>
	)
}
const UserCard = styled.div`
	display: flex;
	flex-direction: column;
	color: white;
	h4 {
		text-align: center;
		width: 100%;
		margin: 1rem;
	}
`

export default Sidenav
