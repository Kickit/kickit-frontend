import React, { Component } from 'react'
import { Row } from '../../../../utils/anvil'
import EditableField from '../../../components/EditableField';

class EditableTask extends Component {
	render() {
    return (
      <Row>
        <EditableField
          value={this.props.item.data.title}
          onChange={this.props.onChange}
          field='title'
        />
        {this.props.item.data.description &&
        <EditableField
					value={this.props.item.data.description}
					onChange={this.props.onChange}
					field='description'
        />
        }
      </Row>
    )
	}
}

export default EditableTask