import React from 'react'
import { 
	Button, Input, Form, 
	Message, Sidebar, Segment, 
	Menu, Image, Icon, 
	Header, Label, Divider 
} from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import styled, { css } from 'styled-components'
import data from '../../../fixture'
import '../../../index.css'


const SortableItem = SortableElement(({value}) =>
    {if(value.type == 'section'){
        return <li className='section'><h1>{value.data.title}</h1></li>
    } else {
        return <li className='task'>{value.data.title}</li>
    }}
)

const SortableList = SortableContainer(({items}) => {
  return (
    <ul className='project-list'>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  )
})


class Project extends React.Component {
	constructor(props) {
        super(props)
        let items = []
        console.log(items)
        this.state = {
            project: props.project,
            items: this.projectItems(props.project),
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('Update: ',nextProps)
        this.setState({ project: nextProps.project, items: this.projectItems(nextProps.project) });  
    }

    getItemList(project) {
        return null
    }

    projectItems(project) {
        if(project === undefined || project.sections === undefined){return []}

        return [].concat(...project.sections.map( section => {
            return [].concat({type: 'section', data: section}, ...section.tasks.map( task => {
                return {type:'task', data: task}
            }))
        }))
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items : arrayMove(this.state.items, oldIndex, newIndex)
        })

    }
	render() {
		return (
			<ProjectContainer>
                <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
		    </ProjectContainer>
		)
	}
}

const ProjectList = styled(SortableContainer)`
    background-color: black;
    padding-top: 500px;
    .project-list {
        background-color: black;
    }
`

const ProjectContainer = styled('div')`
	color: #FFFFFF;
	padding: 15px;
    background: linear-gradient(135deg, rgba(30, 187, 202,0.4), rgba(235, 188, 167, 0.4));
    border-radius: 1rem;
    overflow-y: overlay;
    ul {
        list-style-type: none;
        padding: 0;
        li {
            background-color: #FFFFFF;
            cursor: pointer;
            margin-top: 10px;
            padding: 15px;
            border-radius: 5px;
            font-family: "Fira Sans", sans-serif;
            color: #757575;
            transition: opacity 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
    }

`

export default Project