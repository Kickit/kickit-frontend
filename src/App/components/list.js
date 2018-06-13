import React from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { Card } from '../../utils/anvil'


class KickitList extends React.Component {
	constructor (props) {
		super(props)
		debugger
	}
	render () {
		return (<List
			style={{maxWidth: '100%'}} 
			itemTemplate={this.props.itemTemplate}
			pressDelay={200} 
			items={this.props.items} 
			onSortEnd={this.props.onSortEnd} 
		/>)
	}
}

const List = SortableContainer(({ items, itemTemplate }) => (
	<ProjectList>
		{items.map((value, index) => (
			<Item key={`item-${index}`} index={index} value={value} ItemTemplate={itemTemplate}/>
		))}
	</ProjectList>
)
)

const Item = SortableElement(({value, ItemTemplate}) => (
	<ItemTemplate value={value}/>   
))

export default KickitList

const ProjectList = Card.extend`
    &.ui.segment {
        background: linear-gradient(135deg, rgba(30, 187, 202,0.4), rgba(235, 188, 167, 0.4));
        border-radius: 0.5rem;
        color: #FFFFFF;
        list-style: none;
        overflow-y: overlay;
    }
`