import React, { Component } from 'react'
import Plain from 'slate-plain-serializer'
import { Editor } from 'slate-react'


class EditableField extends Component {
    state = {
        value: Plain.deserialize(this.props.value || ''),
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.value !== Plain.serialize(nextState.value)){
            nextState.value = Plain.deserialize(nextProps.value)
        }
        return true
    }
    onChange = ({value}) => {
        this.setState({value})
        this.props.onChange({
            value: Plain.serialize(value),
            key: this.props.field,
        })
    }
	render() {
        return (
            <Editor
                placeholder={this.props.placeholder}
                value={this.state.value}
                onChange={this.onChange}
            />
        )
	}
}

export default EditableField