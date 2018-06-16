import React, { Component } from 'react'
import { withRouter } from 'react-router'
// import { Link } from 'react-router-dom'
// import { Icon } from 'semantic-ui-react'
// import { Card, Row } from '../../../../utils/anvil'

// TODO: @nicklewanowicz customize loader using this tool when layout is more concrete
// https://github.com/danilowoz/react-content-loader
import { Facebook } from 'react-content-loader'

// TODO: @nicklewanowicz add support for contenteditable pieces like https://github.com/ianstormtaylor/slate
class TaskDetails extends Component {
	constructor(props) {
		super(props)
		debugger
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
			<div>
				<h1>{this.props.data.task.title}</h1>
				<p >{this.props.data.task.description}</p>
			</div>
		)
	}
}

export default withRouter(TaskDetails)