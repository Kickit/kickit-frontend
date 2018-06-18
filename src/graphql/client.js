import {ApolloClient, InMemoryCache, HttpLink, ApolloLink } from 'apollo-boost'
import { AUTH_TOKEN } from '../utils/constants'
import { persistCache } from 'apollo-cache-persist'
import link from './mock'

// TODO: Figure out how to populate from cli or config
const mocking = false

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
  

let httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)

if (mocking) {
	httpLinkWithAuthToken = link
}

const cache = new InMemoryCache()


// TODO: @nicklewanowicz: update to indexdb using somthing like https://github.com/localForage/localForage
// this conditional is so tests wont fail on localstorage
if(window.localStorage){
	persistCache({
		cache,
		storage: window.localStorage,
	})
}
const client = new ApolloClient({
	link: httpLinkWithAuthToken,
	cache: cache,
})

export { client }