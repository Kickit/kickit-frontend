import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import { 
	Button, Input, Form, 
	Message, Sidebar, Segment, 
	Menu, Image, Icon, 
	Header, Label, Divider 
} from 'semantic-ui-react'
import styled, { css } from 'styled-components'
import '../../index.css'
import Project from './components/project'
import { AUTH_TOKEN } from '../../constants'
import logo from '../../kickit_logo.png'
import data from '../../fixture'  //Fixture data to start with, will wire up later


// Home: Dashboard style setup with some grouping and visualizations
class Home extends React.Component {
	constructor(props){
		super(props)
		let x = data
		let project = data.projects.filter( proj => {
			return proj.id === props.location.pathname.split('/')[3]
		})[0] || null
		this.state = { 
			sidebar: false,
			selectedProject: project
		}
	}
	
	// toggleVisibility: Open and close sidebar
	toggleVisibility = () => this.setState({ sidebar: !this.state.sidebar })
	
	// userInfo: piece to populate account information of sidebar
	userInfo = () => {
		return (
			<UserCard>
				<h4><Icon name='user outline' size='small' />{data.first} {data.last}</h4>
				<p>{data.email}</p>
				<Divider inverted/>
			</UserCard>
		)
	}
	// menuProjects: piece to populated projects for a user
	menuProjects = () => {
		return data.projects.map( el => {
			return (
				<Menu.Item name={el.title} position='left' onClick={() => this.goToProject(el)}>
					<p>{el.title}<Icon name='angle right' inverted={true} size='small' /></p>
        </Menu.Item>
			)
		})
	}

	// goToProject: function to manage navigation to project route
	goToProject = (project) => {
		this.setState({ selectedProject: project });
		this.props.history.push(`/0/projects/${project.id}`)
	}

	// closeSidebar: specifically close the sidebar when user clicks away from it
	closeSidebar = () => {
    if (this.state.sidebar) {
      this.setState({ sidebar: false });
    }
	}

	// goTo: simple helper to goto a given route
	goTo = (route) => {
		this.props.history.push(`/0/`)
	}

	// logout: remove auth token from storage and redirect to login
	logout = () => {
		localStorage.removeItem(AUTH_TOKEN)
		this.props.history.push(`../../login`)
	}
	
	// Todo: break sidebar into its own component
	render() {
		const { sidebar } = this.state
		return (
			<div>
			<Outlet as={Segment} >
				<Sidebar 
					as={Menu} 
					animation='push' 
					width='wide' 
					visible={sidebar} 
					icon='labeled' 
					onClick={this.closeSidebar} vertical inverted>
					<this.userInfo/>
					<this.menuProjects/>
				</Sidebar>
				<Sidebar.Pusher>
					<TopBar>
						<Row>
							<NavButton 
								basic onClick={this.toggleVisibility}>
								<Icon name='sidebar' />
							</NavButton>
							<NavButton 
								basic onClick={() => this.goTo('/0/')}>
								<Icon name='home' />
							</NavButton>
						</Row>
						<Logo src={logo}/>
						<NavButton basic onClick={this.logout}>
							<Icon name='external' />
						</NavButton>
					</TopBar>
					<Main basic onClick={this.closeSidebar}>
						<Switch>
							<Route path='/0/projects/:projectid' render={() => <Project project={this.state.selectedProject}/>} />
						</Switch>
					</Main>
				</Sidebar.Pusher>
			</Outlet>
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

const Row = styled('div')`
	display: flex;
	flex-direction: row;
` 

const Logo = styled.img`
	width: 12rem;
  height: 12rem;
`
const Outlet = styled(Sidebar.Pushable)`
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

const TopBar = styled(Segment)`
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


export default Home