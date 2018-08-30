import React from 'react'
import { Icon, Dropdown } from 'semantic-ui-react'
import EditableField from '../../../components/EditableField'
import { deleteTask } from '../../../../graphql/mutations'
import { graphql, compose } from 'react-apollo'

const EditableTask = (props) => {
	const close = () => {
		props.selectItem(null)
	}

	const trigger = (
		<Icon name='ellipsis vertical'/>
	)
	
	const options = [
		{ key: 'trash', text: 'Delete', icon: 'trash', value: 'delete' }
	]

	const handleOptions = async (e, { value }) => {
		if(value === 'delete'){
			await props.deleteTask({
				variables: {
					id: props.item.data.id
				}
			})
			props.selectItem(null)
		}
	}
	
	return (
		<div className='flex flex-column'>
			<div className='flex justify-between'>
				{/*<Icon type="ellipsis" />
					<Icon type="close" />*/}
				<Icon name='close' onClick={close}/>
				<Dropdown trigger={trigger} options={options} onChange={handleOptions} pointing='top right' icon={null} />
			</div>
			<EditableField
				classes='f1 lh-copy tl nowrap'
				placeholder='Task Title'
				value={props.item.data.title}
				onChange={props.onChange}
				field='title'
			/>
			{props.item.data.description !== null &&
			<EditableField
				classes='ba b--light-gray pa2 ma2 tl'
				placeholder='Write task description here...'
				value={props.item.data.description}
				onChange={props.onChange}
				field='description'
			/>
			}
		</div>
	)
}

// const TastOptions = (props) => {
	
// 	return (
// 		<Dropdown overlay={menu} placement="bottomLeft">
// 			 <Icon type="ellipsis" />
// 		</Dropdown>
// 	)
// }

export default compose(
	graphql(deleteTask, { name: 'deleteTask'})
)(EditableTask)