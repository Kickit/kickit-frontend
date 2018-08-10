import React from 'react'
import { Sidebar, Segment, Divider } from 'semantic-ui-react'
import { Menu, notification, Dropdown, Icon, Card, Input, Checkbox  } from 'antd'

import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Sidenav = (props) => (
		<div >
			<UserInfo user={props.user} />
			<MenuProjects projects={props.user.projects}/>
		</div>
	)
// MenuProjects: piece to populated projects for a user
const MenuProjects = ({ projects }) => (
	<Menu theme="dark">
		{projects.map( project => {
			return (
				<Menu.Item key={project.id}>
				<Link key={project.id} to={`/0/projects/${project.id}`}>
					<span className="nav-text">{project.title}</span>
				</Link>
				</Menu.Item>
			)}
		)}
	</Menu>
)

// UserInfo: piece to populate account information of sidebar
const UserInfo = ({ user }) => {
	return (
		<div className='white flex-column tc mt2'>
			<p className='f6'>{user.first} {user.last}</p>
			<p className='f6'>{user.email}</p>
		</div>
	)
}

export default Sidenav
