import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc'
import { 
	Button, Input, Form, 
	Message, Sidebar, Segment, 
	Menu, Image, Icon, 
	Header, Label, Divider 
} from 'semantic-ui-react'
import styled, { css } from 'styled-components'

import data from '../../../fixture'
import '../../../index.css'


// SortableItem: Templating for the card
const SortableItem = SortableElement(({value}) =>
    {if(value.type == 'section'){
        return <StyledElement className='item section'><h1>{value.data.title}</h1></StyledElement>
    } else {
        return (
            <StyledElement className='item task'>
                <span className='title'>{value.data.title}</span>
                <span className='description'>{value.data.description}</span>
            </StyledElement>
        )
    }}
)

// SortableList: Templating for the list
const SortableList = SortableContainer(({items}) => {
  return (
    <ProjectList className='project-list'>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ProjectList>
  )
})


// Project: Component used on the /projects/:id route
class Project extends React.Component {
	constructor(props) {
        super(props)
        let items = []
        this.state = {
            project: props.project,
            items: this.projectItems(props.project),
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ project: nextProps.project, items: this.projectItems(nextProps.project) });  
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
                <SortableList pressDelay={200} items={this.state.items} onSortEnd={this.onSortEnd} />
                <div style={{width: '50VW'}}>
                    Sample
                </div>
		    </ProjectContainer>
		)
	}
}

const ProjectList = styled('div')`
    background: linear-gradient(135deg, rgba(30, 187, 202,0.4), rgba(235, 188, 167, 0.4));
    border-radius: 1rem;
    color: #FFFFFF;
    list-style: none;
    overflow-y: overlay;
    padding: 1rem;
`
const StyledElement = styled('li')`
    background-color: #FFFFFF;
    cursor: pointer;
    padding: 5px;
    font-family: "Fira Sans", sans-serif;
    color: #757575;
    &.section {
        margin: 1rem 0rem 1rem 0rem;
        transition: opacity 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
        border-radius: 0.5rem;
        list-style: none;
        text-align: center;
    }
    &.task {
        display: flex;
        border-radius: 0;
        transition: opacity 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
        border-bottom: 1px solid rgba(0,0,0,0.2);
        .title {
            font-weight: 600;
        }
        .description {
            text-align: left;
            width: 80%;
            margin-left: 1rem;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }
`

const ProjectContainer = styled('div')`
    display: flex;
    flex-direction: row;
    width: 100%;
`

export default Project