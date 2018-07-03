import React, { Component } from 'react'
import { Row, Column } from '../../../../utils/anvil'
import { Icon } from 'semantic-ui-react'
import EditableField from '../../../components/EditableField';

class EditableTask extends Component {
	close = () => {
		this.props.selectItem(null)
	}
	render() {
    return (
      <Column>
				<Row><Icon name='close' onClick={this.close}/></Row>
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

export default EditableTask