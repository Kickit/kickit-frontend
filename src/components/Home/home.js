import React from 'react';
import '../../index.css';
import { Button, Input, Form, Message, Sidebar, Segment, Menu, Image, Icon, Header, Label, Divider } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import logo from '../../kickit_logo.png';
import data from '../../fixture'
import styled, { css } from 'styled-components';

//Fiture data to start with, will wire up later

class Home extends React.Component {
	state = { sidebar: false }
	toggleVisibility = () => this.setState({ sidebar: !this.state.sidebar })
	
	userInfo = () => {
		return (
			<UserCard>
				<h4><Icon name='user outline' size='small' />{data.first} {data.last}</h4>
				<p>{data.email}</p>
				<Divider inverted/>
			</UserCard>
		)
	}
	menuProjects = () => {
		return data.projects.map( el => {
			return (
				<Menu.Item name={el.title} position='left'>
					<p>{el.title}<Icon name='angle right' inverted={true} size='small' /></p>
        </Menu.Item>
			)
		})
	}

	handleClick = () => {
    if (this.state.sidebar) {
      this.setState({ sidebar: false });
    }
	}
	
	render() {
		const { sidebar } = this.state
		return (
			<div>
			<Content as={Segment} >
				<Sidebar as={Menu} animation='push' width='wide' visible={sidebar} icon='labeled' onClick={this.handleClick} vertical inverted>
					<this.userInfo/>
					<this.menuProjects/>
				</Sidebar>
				<Sidebar.Pusher>
					<Tbar> 
					<NavButton 
						basic onClick={this.toggleVisibility}>
						<Icon name='sidebar' />
					</NavButton>
					<Logo src={logo}/>
					<NavButton basic onClick={this.toggleVisibility}><Icon name='external' /></NavButton>
					</Tbar>
					<Main basic onClick={this.handleClick}>
						{/* //List will go here */}
					</Main>
				</Sidebar.Pusher>
			</Content>
		</div>
		)
	}

}



// Styling

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 376
}

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `

  return acc
}, {})

//Media Query Example
// const Content = styled.div`
//   height: 3em;
//   width: 3em;
//   background: papayawhip;

//   /* Now we have our methods on media and can use them instead of raw queries */
//   ${media.desktop`background: dodgerblue;`}
//   ${media.tablet`background: mediumseagreen;`}
//   ${media.phone`background: palevioletred;`}
// `;

const Logo = styled.img`
	width: 12rem;
  height: 12rem;
`
const Content = styled(Sidebar.Pushable)`
	:last-child {
		background-color: rgba(0,0,0,0);
	}
`

const Screen = styled.div`
  display: flex;
	width: 100VW;
	height: 100VH;
`

const Main = styled(Segment)`
  display: flex;
	height: calc(100VH - 88px);
	padding: 0;
	margin: 0;
`
const NavButton = styled(Button)`
	display: flex;
	max-height: 2.5rem;
	max-width: 4rem;
	padding: 0;
	margin: 0;
`
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

const Tbar = styled(Segment)`
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
const SBar = styled.div`
  display: flex;
`


export default Home