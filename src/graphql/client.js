import {ApolloClient, InMemoryCache, HttpLink, ApolloLink } from 'apollo-boost'
import { AUTH_TOKEN } from '../utils/constants'
import { persistCache } from 'apollo-cache-persist'

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

const cache = new InMemoryCache()


// TODO: @nicklewanowicz: update to indexdb using somthing like https://github.com/localForage/localForage
persistCache({
	cache,
	storage: window.localStorage,
  });

const client = new ApolloClient({
	link: httpLinkWithAuthToken,
	cache: cache,
})

export { client }