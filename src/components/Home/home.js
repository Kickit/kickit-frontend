import React from 'react';
import '../../index.css';
import { Button, Input, Form, Message, Sidebar, Segment, Menu, Image, Icon, Header, Label } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import logo from '../../kickit_logo.png';
import data from '../../fixture'
import styled, { css } from 'styled-components';

//Fiture data to start with, will wire up later

class Home extends React.Component {
	state = { sidebar: false }
	toggleVisibility = () => this.setState({ sidebar: !this.state.sidebar })
	
	menuProjects = () => {
		return data.projects.map( el => {
			return (
				<Menu.Item name={el.title} position='left'>
					- {el.title}
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
			<Sidebar.Pushable as={Segment}>
				<Sidebar as={Menu} animation='push' width='thin' visible={sidebar} icon='labeled' vertical inverted>
					<this.menuProjects/>
				</Sidebar>
				<Sidebar.Pusher>
					<Tbar> This is the nav </Tbar>
					<Main basic onClick={this.handleClick}>
						<Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
					</Main>
				</Sidebar.Pusher>
			</Sidebar.Pushable>
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

const Screen = styled.div`
  display: flex;
	width: 100VW;
	height: 100VH;
`

const Main = styled(Segment)`
  display: flex;
	height: calc(100VH - 68px);
	padding: 0;
	margin: 0;
`
const Tbar = styled(Segment)`
  display: flex;
	width: 100%;

`
const SBar = styled.div`
  display: flex;
`


export default Home