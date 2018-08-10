import React from 'react'
import { Segment } from 'semantic-ui-react'
import { Button, Icon } from 'antd'
import styled from 'styled-components'
import logo from '../../../images/kickit_logo.png'
import { AUTH_TOKEN } from '../../../utils/constants'

const Topbar = (props) => {
	const logout = () => {
		localStorage.removeItem(AUTH_TOKEN)
		props.history.push('../../login')
	}

	return (
		<Container>
			<div className='flex-row'>
				<Icon
					className="trigger"
					type={props.isOpen ? 'menu-unfold' : 'menu-fold'}
					type='menu-unfold'
					onClick={props.toggle}
				/>
				<img className='ml2' style={{height:'3rem', width:'3rem'}} src={logo}/>
			</div>
			<Button onClick={logout} icon="logout" />
		</Container>
	)
}

export default Topbar

const Container = styled(Segment)`
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 0.2rem;
	p {
		font-weight: 800;
		font-size: 2rem;
		margin: 0;
	}
`