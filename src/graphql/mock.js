import { SchemaLink } from 'apollo-link-schema'
import { makeExecutableSchema } from 'graphql-tools'

import resolvers from './resolvers'
import typeDefs from './schema'

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})


export default new SchemaLink({ schema: executableSchema })