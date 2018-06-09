import { Button, Segment, Sidebar } from 'semantic-ui-react'
import styled, { css } from 'styled-components'

// Media query logic
export const sizes = {
    desktop: 992,
    tablet: 768,
    phone: 576
  }
  
export const media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
        @media (max-width: ${sizes[label]}px) {
        ${css(...args)}
        }
    `
    return acc
}, {})


export const Row = styled('div')`
    display: flex;
    flex-direction: row;
`

export const Column = styled('div')`
    display: flex;
    flex-direction: column;
`

export const Card = styled(Segment)`
    &.ui.segment {
        margin: 0.5rem;
        padding: 0.5rem;        
    }
`
export const Container = Row.extend`
    ${media.phone`flex-direction: column;`}
    div {
        max-width: 100%;
    }
`

export const DetailsCard = Card.extend`
    &.ui.segment {

    }
`
export const ListColumn = Column.extend`
    ${media.phone`display: none;`}
`
export const DetailColumn = Column.extend`
    flex: 1;

`

export const IconButton = styled(Button)`
    display: flex;
    max-height: 2.5rem;
    max-width: 4rem;
    padding: 0;
    margin: 0;
`

export const ProjectList = Card.extend`
    &.ui.segment {
        background: linear-gradient(135deg, rgba(30, 187, 202,0.4), rgba(235, 188, 167, 0.4));
        border-radius: 0.5rem;
        color: #FFFFFF;
        list-style: none;
        overflow-y: overlay;
    }
`

export const ListItem = styled('li')`
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

export const AnvilSidebar = {
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