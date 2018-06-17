import gql from 'graphql-tag'

const updateTask = gql`
    mutation updateTask($id: ID!, $title: String, $description: String, $due: Int, $completed: Boolean, $section: ID) {
		updateTask(id: $id, title: $title, description: $description, due: $due, completed: $completed, section: $section) {
			id
			title
			description
		}
	}
`

export { updateTask }