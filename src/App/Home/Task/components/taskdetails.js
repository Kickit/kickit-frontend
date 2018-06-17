import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Plain from 'slate-plain-serializer'
// import { Link } from 'react-router-dom'
// import { Icon } from 'semantic-ui-react'
import { TitleEditor, TextEditor, Column } from '../../../../utils/anvil'

// TODO: @nicklewanowicz customize loader using this tool when layout is more concrete
// https://github.com/danilowoz/react-content-loader
import { Facebook } from 'react-content-loader'

// TODO: @nicklewanowicz add support for contenteditable pieces like https://github.com/ianstormtaylor/slate
class TaskDetails extends Component {
  
  state = {
    title: Plain.deserialize(''),
    description: Plain.deserialize(''),
    id: null,
  }

  // TODO: @nicklewanowicz revisit and see if there is a less hacky way of doing this
  static getDerivedStateFromProps(props, state){
    debugger
    if (props.data.task && props.data.task.id !== state.id) {
      return {
        title: Plain.deserialize(props.data.task.title),
        description: Plain.deserialize(props.data.task.description),
        id: props.data.task.id
      }
    } 
    return null
  }

  // TODO: @nicklewanowicz make a more generic onchange function
	onTitleChange = ({ value }) => {
    // Save the value to Local Storage.
    if(this.state.id){
      this.props.updateTask({
        variables: {
          id: this.state.id,
          title: Plain.serialize(value)
        }
      })
    }
    // replace this with mutation to save {localStorage.setItem('content', content)}
    this.setState({ title: value })
  }
  onDescriptionChange = ({ value }) => {
    // Save the value to Local Storage.
    if(this.state.id){
      this.props.updateTask({
        variables: {
          id: this.state.id,
          description: Plain.serialize(value)
        }
      })
    }
    // replace this with mutation to save {localStorage.setItem('content', content)}
    this.setState({ description: value })
  }
	render() {
		if (this.props.data.loading) {
      return (<Facebook />)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }
    return (
      <Column>
        <TitleEditor
          placeholder="Enter some plain text..."
          value={this.state.title}
          onChange={this.onTitleChange}
        />
        <TextEditor
          placeholder="Enter some plain text..."
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
      </Column>
    )
	}
}

export default withRouter(TaskDetails)