import React from 'react'
import { 
	Button, Input, Form, 
	Message, Sidebar, Segment, 
	Menu, Image, Icon, 
	Header, Label, Divider 
} from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import styled, { css } from 'styled-components'
import data from '../../../fixture'
import '../../../index.css'


class Project extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            project: props.project
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ project: nextProps.project });  
    }
	render() {
		return (
			<div>
            {this.state.project.id}
		    </div>
		)
	}

}

export default Project