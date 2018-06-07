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
import {Card} from '../../../utils/kickitComponents'
import data from '../../../utils/fixture'
import '../../../styles/index.css'


// SortableItem: Templating for the card
const SortableItem = SortableElement(({value, clicked}) =>
    
    {if(value.type == 'section'){
        return <StyledElement className='item section'><h1>{value.data.title}</h1></StyledElement>
    } else {
        return (
            <div onClick={()=> clicked(value)}>
            <StyledElement className='item task'>
                <span className='title'>{value.data.title}</span>
                <span className='description'>{value.data.description}</span>
            </StyledElement>
            </div>
        )
    }}
)

// SortableList: Templating for the list
const SortableList = SortableContainer(({items, clicked, visable}) => {
    return (
        <ProjectList className={`project-list ${visable}`}>
        {items.map((value, index) => (
            <SortableItem key={`item-${index}`}  index={index} value={value} clicked={clicked} />
        ))}
        </ProjectList>
    )
})

// TaskDetails: Full information related to the task 
const TaskDetails = ({task, close}) => {
    if (task) {
        return (
            <DetailsCard>
                <Row><Icon name='close' onClick={()=> close(null)}/></Row>
                <h1>{task.data.title}</h1>
                <p>{task.data.description}</p>
            </DetailsCard>
        )
    } else {
        return null
    }
}

// Project: Component used on the /projects/:id route
class Project extends React.Component {
	constructor(props) {
        super(props)
        let items = []
        console.log(this.projectItems(props.project))
        this.state = {
            project: props.project,
            items: this.projectItems(props.project),
            selectedItem: null,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ project: nextProps.project, items: this.projectItems(nextProps.project) });  
    }

    projectItems(project) {
        if( !project || project.sections === undefined){return []}

        return [].concat(...project.sections.map( section => {
            return [].concat({type: 'section', data: section}, ...section.tasks.map( task => {
                return {type:'task', data: task}
            }))
        }))
    }

    selectItem(item) {
        this.setState({selectedItem: item})
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items : arrayMove(this.state.items, oldIndex, newIndex)
        })

    }
	render() {
		return (
			<Container>
                <ListColumn style={{display: this.state.selectedItem ? '' : 'inherit'}}>
                    <SortableList style={{maxWidth: '100%'}} visable={!!this.state.selectedItem ? 'sm-invisible' : 'sm-visible'} clicked={e => this.selectItem(e)} pressDelay={200} items={this.state.items} onSortEnd={this.onSortEnd} />
                </ListColumn>
                <DetailColumn style={{display: this.state.selectedItem ? '' : 'none'}}>
                    <TaskDetails close={e => this.selectItem(e)} task={this.state.selectedItem}/>
                </DetailColumn>
		    </Container>
		)
	}
}

// Media query logic
const sizes = {
    desktop: 992,
    tablet: 768,
    phone: 576
  }
  
const media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
        @media (max-width: ${sizes[label]}px) {
        ${css(...args)}
        }
    `
    return acc
}, {})


const Row = styled('div')`
    display: flex;
    flex-direction: row;
`

const Column = styled('div')`
    display: flex;
    flex-direction: column;
    flex: 1;
`
const Container = Row.extend`
    ${media.phone`flex-direction: column;`}
    div {
        max-width: 100%;
    }
`

const DetailsCard = Card.extend`
    &.ui.segment {

    }
`
const ListColumn = Column.extend`
    ${media.phone`display: none;`}
`
const DetailColumn = Column.extend`
    flex: 1;

`

const ProjectList = Card.extend`
    &.ui.segment {
        background: linear-gradient(135deg, rgba(30, 187, 202,0.4), rgba(235, 188, 167, 0.4));
        border-radius: 0.5rem;
        color: #FFFFFF;
        list-style: none;
        overflow-y: overlay;
    }
`

const StyledElement = styled('li')`
    margin: 0 0.5rem 0 0;
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
            margin-left: 1rem;
            text-overflow: ellipsis;
            overflow-y: hidden;
            max-height: 1rem;
        }
    }
`

export default Project