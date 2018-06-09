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
import { Card, Row, Column, ProjectList, ListItem, media} from '../../../utils/anvil'
import data from '../../../utils/fixture'
import '../../../styles/index.css'


// SortableItem: Templating for the card
const SortableItem = SortableElement(({value, clicked}) =>
    
    {if(value.type == 'section'){
        return <ListItem className='item section'><h1>{value.data.title}</h1></ListItem>
    } else {
        return (
            <div onClick={()=> clicked(value)}>
            <ListItem className='item task'>
                <span className='title'><h4>{value.data.title}</h4></span>
                <span className='description'><p>{value.data.description}</p></span>
            </ListItem>
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
            <Card>
                <Row><Icon name='close' onClick={()=> close(null)}/></Row>
                <h1>{task.data.title}</h1>
                <p>{task.data.description}</p>
            </Card>
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
			<Row>
                <ListColumn style={{display: this.state.selectedItem ? '' : 'inherit'}}>
                    <SortableList style={{maxWidth: '100%'}} visable={!!this.state.selectedItem ? 'sm-invisible' : 'sm-visible'} clicked={e => this.selectItem(e)} pressDelay={200} items={this.state.items} onSortEnd={this.onSortEnd} />
                </ListColumn>
                <DetailColumn style={{display: this.state.selectedItem ? '' : 'none'}}>
                    <TaskDetails close={e => this.selectItem(e)} task={this.state.selectedItem}/>
                </DetailColumn>
		    </Row>
		)
	}
}

const ListColumn = Column.extend`
    flex: 1;
    ${media.phone`display: none;`}
`
const DetailColumn = Column.extend`
    flex: 1;
`


export default Project