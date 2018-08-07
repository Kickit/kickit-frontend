import React from 'react'
import { Row, Column } from '../../../../utils/anvil'
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
		<Column>
			<Row className='justify-between'>
				<Icon name='close' onClick={close}/>
				<Dropdown trigger={trigger} options={options} onChange={handleOptions} pointing='top right' icon={null} />
			</Row>
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
		</Column>
	)
}

export default compose(
	graphql(deleteTask, { name: 'deleteTask'})
)(EditableTask)