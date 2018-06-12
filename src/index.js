import React from 'react'
import ReactDOM from 'react-dom'
import App from './App/App'
import registerServiceWorker from './registerServiceWorker'

import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import { client } from './graphql/client'

import './styles/index.css'
import './styles/App.css'

// TODO: Break Apollo Provider into wrapper
ReactDOM.render(
	<BrowserRouter>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</BrowserRouter>
	, document.getElementById('root'))
registerServiceWorker()
