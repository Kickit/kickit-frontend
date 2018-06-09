import React from 'react'
import { withRouter } from 'react-router'
import { Button, Segment, Icon } from 'semantic-ui-react'
import  { Row, IconButton, media } from '../../../utils/anvil'
import styled, { css } from 'styled-components'
import logo from '../../../images/kickit_logo.png'
import { AUTH_TOKEN } from '../../../utils/constants'

class Topbar extends React.Component {
	// logout: remove auth token from storage and redirect to login
	logout = () => {
		localStorage.removeItem(AUTH_TOKEN)
		this.props.history.push(`../../login`)
	}

  render() {
    return (
        <Container className='Topbar'>
            <Row>
                <IconButton 
                    basic onClick={this.props.toggleSidebar}>
                    <Icon name='sidebar' />
                </IconButton>
                <IconButton 
                    basic onClick={() => this.goTo('/')}>
                    <Icon name='home' />
                </IconButton>
            </Row>
            <Logo src={logo}/>
            <IconButton basic onClick={this.logout}>
                <Icon name='external' />
            </IconButton>
        </Container>
    )
  }
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