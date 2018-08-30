import React from 'react'
import { Sidebar, Segment, Divider } from 'semantic-ui-react'
import { Menu, notification, Dropdown, Icon, Card, Input, Checkbox  } from 'antd'
import logo from '../../../images/kickit_logo.png'

import { Link } from 'react-router-dom'
import styled from 'styled-components'
import AddProjectButton from 'App/components/AddProjectButton';


const Sidenav = (props) => (
		<div >
			<LogoHeader/>
			<MenuProjects projects={props.user.projects}/>
		</div>
)

const LogoHeader = () => (
	
	<div className='flex flex-row mt2 justify-start white f3'>
		<img className='h2 w2 ma2' src={logo}/>
		{console.log(process.env)}
		<p className='mt2'>Kickit</p>
	</div>
)
// MenuProjects: piece to populated projects for a user
const MenuProjects = ({ projects }) => (
	<Menu theme="dark">
		<Menu.Item className='mb4' key='home'>
			<Link to={`/0`}>
				<Icon type="home" /><span className="nav-text">Home</span>
			</Link>
		</Menu.Item>
		<div className='ml2 mt4 mb3 b'>My Projects</div>
		{projects.map( project => {
			return (
				<Menu.Item onMouseOver={() => console.log('asda')} key={project.id}>
				<Link to={`/0/projects/${project.id}`}>
					<span className="nav-text">{project.title}</span>
				</Link>
				</Menu.Item>
			)}
		)}
		<div className='ml3'>
		<AddProjectButton />
		</div>
	</Menu>
)

export default Sidenav
