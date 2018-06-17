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

const task = gql`
	query task($id: ID!) {
		task(id: $id) {
			id
			title
			description
			# sections {
			# 	title
			# 	tasks {
			# 		id
			# 		title
			# 		description
			# 	}
			# }
		}
	}
`
export { me, project, task }