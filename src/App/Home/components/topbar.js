import React from 'react'
import { Link } from 'react-router-dom'
import { Segment, Icon } from 'semantic-ui-react'
import  { Row, IconButton } from '../../../utils/anvil'
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
			<Row>
				<IconButton 
					basic onClick={props.toggleSidebar}>
					<Icon name='sidebar' />
				</IconButton>
				{props.location !== '/0/' &&
					<Link to='/0/'>
						<IconButton basic>
						<Icon name='home' />
						</IconButton>
					</Link>
				}
				
			</Row>
			<Logo src={logo}/>
			<IconButton basic onClick={logout}>
				<Icon name='external' />
			</IconButton>
		</Container>
	)
}

export default Topbar

const Logo = styled.img`
	width: 12rem;
    height: 12rem;
`

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