import { SchemaLink } from 'apollo-link-schema'
import { makeExecutableSchema } from 'graphql-tools'

import typeDefs from './schema'



// TODO: @nicklewanowicz move to another files like typeDefs
const resolvers = {
    Query: {
      me: () => ({
        id: 'asd',
        first: `Nick`,
        last: `Lew`,
        email: `https://github.com/`,
        projects: [
          
        ],
      }),
    },
  }

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})


export default new SchemaLink({ schema: executableSchema })