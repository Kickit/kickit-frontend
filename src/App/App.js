import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login/Login'
import Home from './Home/Home'
import '../styles/App.css'

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route path='/login'    component={Login}/>
						<Route path='/register' component={Login}/>
						<Route path='/'         component={Home} />
					</Switch>
				</Router>
				{/* Todo: make this a component */}
				<div className="circle one">&nbsp;</div>
				<div className="circle three">&nbsp;</div>
				<div className="circle four">&nbsp;</div>
				<div className="circle five">&nbsp;</div>
				<div className="circle six">&nbsp;</div>
				<div className="circle seven">&nbsp;</div>
				<div className="circle eight">&nbsp;</div>
				<div className="circle nine">&nbsp;</div>
				<div className="circle ten">&nbsp;</div>
				<div className="circle eleven">&nbsp;</div>
				<div className="circle twelve">&nbsp;</div>
				<div className="circle thirteen">&nbsp;</div>
				<div className="circle fourteen">&nbsp;</div>
			</div>
		)
	}
}

export default App
