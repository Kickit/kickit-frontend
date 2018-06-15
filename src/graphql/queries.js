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
			sections {
				title
				tasks {
					id
					title
					description
				}
			}
		}
	}
`

export { me, project }