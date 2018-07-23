import React, { Component } from 'react'
import { Row, Column } from '../../../../utils/anvil'
import { Icon, Dropdown } from 'semantic-ui-react'
import EditableField from '../../../components/EditableField'
import { deleteTask } from '../../../../graphql/mutations'
import { graphql, compose } from 'react-apollo'

class EditableTask extends Component {
	close = () => {
		this.props.selectItem(null)
	}
	render() {
		const trigger = (
			<Icon name='ellipsis vertical'/>
		)
		
		const options = [
			{ key: 'trash', text: 'Delete', icon: 'trash', value: 'delete' }
		]

		const handleChange = (e, { value }) => {
			if(value === 'delete'){
				console.log(this.props.item.data)
				this.props.deleteTask({
					variables: {
						id: this.props.item.data.id
					}
				})
			}
		}
		
    return (
			<Column>
				<Row className='justify-between'>
					<Icon name='close' onClick={this.close}/>
					<Dropdown trigger={trigger} options={options} onChange={handleChange} pointing='top right' icon={null} />
				</Row>
        <EditableField
					classes='f1 lh-copy tl nowrap'
					placeholder='Task Title'
          value={this.props.item.data.title}
          onChange={this.props.onChange}
					field='title'
        />
        {this.props.item.data.description !== null &&
        <EditableField
					classes='ba b--light-gray pa2 ma2 tl'
					placeholder='Write task description here...'
					value={this.props.item.data.description}
					onChange={this.props.onChange}
					field='description'
        />
        }
      </Column>
    )
	}
}

export default compose(
	graphql(deleteTask, { name: 'deleteTask'})
)(EditableTask)