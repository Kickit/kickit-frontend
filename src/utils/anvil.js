import { Button, Segment, Sidebar } from 'semantic-ui-react'
import styled, { css } from 'styled-components'

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
`

const Card = styled(Segment)`
    &.ui.segment {
        margin: 0.5rem;
        padding: 0.5rem;        
    }
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
    flex: 1;
    ${media.phone`display: none;`}
`
const DetailColumn = Column.extend`
    flex: 1;

`

const IconButton = styled(Button)`
    display: flex;
    max-width: 4rem;
    padding: 1rem 1rem 1.5rem 1rem;
`

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
	DetailColumn, ListColumn, DetailsCard, 
	IconButton, ListItem, AnvilSidebar
} 