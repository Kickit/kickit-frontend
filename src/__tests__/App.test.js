import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App/App'
import LocalStorageMock from './utils/localStorage'
import { client } from '../graphql/client'

import { ApolloProvider } from 'react-apollo'

global.localStorage = new LocalStorageMock

it('renders without crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
		, div)
	ReactDOM.unmountComponentAtNode(div)
})