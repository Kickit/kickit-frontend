import React, { Component } from 'react'
import Plain from 'slate-plain-serializer'
import {debounce} from 'throttle-debounce';
// import { Link } from 'react-router-dom'
// import { Icon } from 'semantic-ui-react'
import { TextEditor, Row } from '../../../../utils/anvil'

class EditableItem extends Component {
  state = {
		title: Plain.deserialize(this.props.value.data.title),
		description: Plain.deserialize(this.props.value.data.description || ''),
		id: this.props.value.data.id,
	}

  onChange = ({value, name}) => {
		this.setState({ [name]: value })
		debounce(1000, this.props.updateTask({
			variables: {
				id: this.state.id,
				[name]: Plain.serialize(value)
			}
		}))
	}
	render() {
    return (
      <Row>
        <TextEditor
          value={this.state.title}
          onChange={(e) => this.onChange({...e, name: 'title'})}
        />
				{!this.props.value.data.tasks &&
					<TextEditor
						value={this.state.description}
						onChange={(e) => this.onChange({...e, name: 'description'})}
					/>
				}
      </Row>
    )
	}
}

export default EditableItem