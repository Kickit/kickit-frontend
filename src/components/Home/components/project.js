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
        return <li><h1>{value.data.title}</h1></li>
    } else {
        return <li>{value.data.title}</li>
    }}
)

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
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
        if(props.project){
            items = [].concat(...props.project.sections.map( section => {
                return [].concat({type: 'section', data: section}, ...section.tasks.map( task => {
                    return {type:'task', data: task}
                }))
            }))
        }
        console.log(items)
        this.state = {
            project: props.project,
            items: items
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ project: nextProps.project });  
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items : arrayMove(this.state.items, oldIndex, newIndex)
        })

    }
	render() {
        console.log(this.state.items)
		return (
			<div>
                <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
		    </div>
		)
	}
}

export default Project