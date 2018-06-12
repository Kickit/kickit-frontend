import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App/App'
import LocalStorageMock from './utils/localStorage'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { AUTH_TOKEN } from '../utils/constants'
import { ApolloLink } from 'apollo-client-preset'

global.localStorage = new LocalStorageMock


// TODO: Break out the following into a utility
const httpLink = new HttpLink({ uri: 'http://localhost:3030/graphql' })

const middlewareAuthLink = new ApolloLink((operation, forward) => {
	const token = localStorage.getItem(AUTH_TOKEN)
	const authorizationHeader = token ? `Bearer ${token}` : null
	operation.setContext({
		headers: {
			Authorization: authorizationHeader
		}
	})
	return forward(operation)
})
  
const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)

const client = new ApolloClient({
	link: httpLinkWithAuthToken,
	cache: new InMemoryCache(),
})


it('renders without crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
		, div)
	ReactDOM.unmountComponentAtNode(div)
})