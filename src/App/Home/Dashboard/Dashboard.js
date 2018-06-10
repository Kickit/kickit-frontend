import React from 'react'

// Dashboard: Dashboard style setup with some grouping and visualizations
class Dashboard extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			data: props.data,
		}
	}
    
	render() {
		return (
			<div>
                Dashboard
            </div>
		)
	}

}
export default Dashboard
