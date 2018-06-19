import {ApolloClient, InMemoryCache, HttpLink, ApolloLink } from 'apollo-boost'
import { AUTH_TOKEN } from '../utils/constants'
import { persistCache } from 'apollo-cache-persist'
import link from './mock'
import config from '../config'

// TODO: use uri from env or config
const httpLink = new HttpLink({ uri: `${config.HOST}:${config.PORT}/${config.API}` })

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

if (config.MOCK) {
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