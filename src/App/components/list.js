import React from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { Card } from '../../utils/anvil'

const KickitList = ({ items, itemTemplate, onSortEnd }) => (
	<List
		style={{maxWidth: '100%'}} 
		itemTemplate={itemTemplate}
		pressDelay={200} 
		items={items} 
		onSortEnd={onSortEnd} 
	/>
) 

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

export { KickitList }

const ProjectList = Card.extend`
    &.ui.segment {
        background: linear-gradient(135deg, rgba(30, 187, 202,0.4), rgba(235, 188, 167, 0.4));
        border-radius: 0.5rem;
        color: #FFFFFF;
        list-style: none;
        overflow-y: overlay;
    }
`