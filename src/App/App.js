import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Background from './components/background'
import Login from './Login/Login'
import Home from './Home/Home'
import '../styles/App.css'
import Background from './components/background';

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
				<Background/>
			</div>
		)
	}
}

export default App
