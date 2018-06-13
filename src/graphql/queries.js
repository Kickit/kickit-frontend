import gql from 'graphql-tag'

const me = gql` {
	me {
		id
		first
		last
		email
		projects {
			id
			title
		}
	}
}`

const project = gql`
	query project($id: ID!) {
		project(id: $id) {
		id
		title
		}
	}
`

export { me, project }