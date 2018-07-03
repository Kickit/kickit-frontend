import React from 'react'
import { Button, Segment, Sidebar, Checkbox } from 'semantic-ui-react'
import styled, { css } from 'styled-components'


// ---------------------------------------------------------
// Media query logic
// ---------------------------------------------------------

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

// ---------------------------------------------------------
// Types of containers 
// ---------------------------------------------------------

const FB = styled('div')`
    display: flex;
    ${media.phone`
        order: ${props => props.orderSm};
    `}
`
const Row = FB.extend`
    flex-direction: row;
`

const Column = FB.extend`
    flex-direction: column;
`

const Container = Row.extend`
    ${media.phone`flex-direction: column;`}
    div {
        max-width: 100%;
    }
`

const Card = styled(Segment)`
    &.ui.segment {
        margin: 0.5rem;
        padding: 0.5rem;        
    }
`

const DetailsCard = Card.extend`
    &.ui.segment {

    }
`
const CardColumn = Column.extend`
    flex: 1;
    ${media.tablet`
        display: ${props => props.phoneInvisible ? 'none' : ''};
    `}
    ${media.phone`
        display: ${props => props.phoneInvisible ? 'none' : ''};
    `}
`
const CardRow = Row.extend`
    flex: 1;
    ${media.phone`
        flex-direction: column;
    `}
`
const DetailColumn = Column.extend`
    flex: 1;

`

// ---------------------------------------------------------
// Buttons and types of event triggers
// ---------------------------------------------------------

const IconButton = styled(Button)`
    display: flex;
    max-width: 4rem;
    padding: 1rem 1rem 1.5rem 1rem;
`
const CompleteTask = ({isComplete, onChange}) => (
    <Checkbox checked={isComplete} onChange={onChange} />
)
// ---------------------------------------------------------
// Garbage
// ---------------------------------------------------------

const ListItem = styled('li')`
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
            max-height: 1.5rem;
        }
    }
`

const AnvilSidebar = {
	Pushable: styled(Sidebar.Pushable)`
    &.ui.segment {
        background: none;
        border: none;
        margin:0;
    }
    .ui.segment {
        border: none;
    }
    `
}

export { 
	media, Row, Column, Card, Container, 
	DetailColumn, CardColumn, CardRow, DetailsCard, 
	IconButton, ListItem, AnvilSidebar
} 