import React from 'react'
import { Sidebar, Segment, Menu, Icon, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import  { AnvilSidebar } from '../../../utils/anvil'

const Sidenav = (props) => (
	<AnvilSidebar.Pushable as={Segment} >
		<Sidebar
			as={Menu}
			animation='push'
			width='wide'
			visible={props.isOpen}
			icon='labeled'
			onClick={props.toggleSidebar} vertical inverted>
			<UserInfo user={props.user} />
			<MenuProjects projects={props.user.projects}/>
		</Sidebar>
		<Sidebar.Pusher style={{height: '100VH', display: 'flex', flexFlow: 'column'}}>
			{props.children}
		</Sidebar.Pusher>
	</AnvilSidebar.Pushable>
)

// MenuProjects: piece to populated projects for a user
const MenuProjects = ({ projects }) => {
	return projects.map( project => {
		return (
			<Link key={project.id} to={`/0/projects/${project.id}`}>
			<Menu.Item name={project.title} position='left'>
				<p>{project.title}<Icon name='angle right' inverted={true} size='small' /></p>
			</Menu.Item>
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
