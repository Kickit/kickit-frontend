import React from 'react'
import { Row } from '../../../../utils/anvil'
import EditableField from '../../../components/EditableField';

const EditableItem = (props) => (
	<div className='flex flex-row'>
			<EditableField
				field='title'
				classes='b'
				value={props.item.data.title}
				onChange={props.onChange}
			/>
			{/* // Not Showing description in item list 
			{this.props.item.data.description &&
				<EditableField
					classes='mh2'
					field='description'
					value={this.props.item.data.description}
					onChange={this.props.onChange}
					
				/>
			} */}
	</div>
)

export default EditableItem