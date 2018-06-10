import React from 'react'
import { Sidebar, Segment, Menu, Icon, Divider } from 'semantic-ui-react'
import styled from 'styled-components'
import  { AnvilSidebar } from '../../../utils/anvil'

class Sidenav extends React.Component {
	constructor(props) {
		super(props)
		this.state = { 
			sidebar: this.props.sidebar,
			data: props.data
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(this.state.sidebar !== nextProps.sidebar){
			this.setState({sidebar: nextProps.sidebar})
			return true
		}
		return false
	}

	// goToProject: function to manage navigation to project route
	goToProject = (project) => {
		this.props.history.push(`/0/projects/${project.id}`)
	}

	// userInfo: piece to populate account information of sidebar
	userInfo = () => {
		return (
			<UserCard>
				<h4><Icon name='user outline' size='small' />{this.state.data.first} {this.state.data.last}</h4>
				<p>{this.state.data.email}</p>
				<Divider inverted/>
			</UserCard>
		)
	}

	// menuProjects: piece to populated projects for a user
	menuProjects = () => {
		return this.state.data.projects.map( el => {
			return (
				<Menu.Item name={el.title} position='left' onClick={() => this.goToProject(el)}>
					<p>{el.title}<Icon name='angle right' inverted={true} size='small' /></p>
        </Menu.Item>
			)
		})
	}

  render() {
    return (
        <AnvilSidebar.Pushable as={Segment} >
            <Sidebar 
                as={Menu} 
                animation='push' 
                width='wide' 
                visible={this.state.sidebar} 
                icon='labeled' 
                onClick={this.props.toggleSidebar} vertical inverted>
                <this.userInfo/>
                <this.menuProjects/>
            </Sidebar>
            <Sidebar.Pusher style={{height: '100VH'}}>
				{this.props.children}
            </Sidebar.Pusher>
	    </AnvilSidebar.Pushable>
    )
  }
}

export default Sidenav

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