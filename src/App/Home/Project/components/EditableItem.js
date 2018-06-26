import React, { Component } from 'react'
import { Row } from '../../../../utils/anvil'
import EditableField from '../../../components/EditableField';

class EditableItem extends Component {
	render() {
    return (
      <Row>
        <EditableField
					field='title'
					classes='b'
          value={this.props.item.data.title}
					onChange={this.props.onChange}
					
        />
				{this.props.item.data.description &&
					<EditableField
						classes='mh2'
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