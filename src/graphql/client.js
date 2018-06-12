import {ApolloClient, InMemoryCache, HttpLink, ApolloLink } from 'apollo-boost'
import { AUTH_TOKEN } from '../utils/constants'


// TODO: use uri from env or config
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

export { client }