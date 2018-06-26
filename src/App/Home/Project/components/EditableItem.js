import React, { Component } from 'react'
import { Row } from '../../../../utils/anvil'
import EditableField from '../../../components/EditableField';

class EditableItem extends Component {
	render() {
    return (
      <Row>
        <EditableField
					field='title'
          value={this.props.item.data.title}
					onChange={this.props.onChange}
					
        />
				{this.props.item.data.description &&
					<EditableField
					field='description'
						value={this.props.item.data.description}
						onChange={this.props.onChange}
						
					/>
				}
      </Row>
    )
	}
}
export default EditableItem