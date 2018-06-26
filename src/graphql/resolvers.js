import data from '../utils/fixture'

let project = null
let section = null
let task = null

const findRecord = (array, id) => {
	for( let i = 0; i < array.length; i++){
		if(array[i].id === id){
			return array[i]
		}
	}
}

export default {
	Query: {
		me: () => (data),
		project: (parent, {id}) => {
			project = findRecord(data.projects, id)
			return project
		},
		task: (parent, {id}) => {
			section = data.projects.filter(project => {
				project.sections.filter(section => {
					return !!findRecord(section.tasks, id)
				})
			})
			task = findRecord(section.tasks, id)
			return task
		}
	},
	Mutation: {
		login: (parent, {email, password}) => {
			console.log(email, password)
			return {
				token: 'This is my token',
				user: {
					id: 'myid',
					first: 'Test',
					last: 'Test2',
					email: email,
				}
			}
		},
		signup: (parent, {first, last, email, password}) => {
			console.log(first, last, email, password)
			data.first = first
			data.last = last
			data.email = email
			return {
				token: 'This is my token',
				user: {
					id: 'myid',
					first: first,
					last: last,
					email: email,
				}
			}
		},
		updateTask: (parent, {id, title, description}) => {
			for (let i = 0; i < data.projects.length; i++) {
				for (let j = 0; j < data.projects[i].sections.length; j++) {
					for (let k = 0; k < data.projects[i].sections[j].tasks.length; k++) {
						if (data.projects[i].sections[j].tasks[k].id === id) {
							data.projects[i].sections[j].tasks[k].title = title || data.projects[i].sections[j].tasks[k].title
							data.projects[i].sections[j].tasks[k].description = description || data.projects[i].sections[j].tasks[k].description
							return data.projects[i].sections[j].tasks[k]
						}
					}
				}
			}
		}
	}
}
