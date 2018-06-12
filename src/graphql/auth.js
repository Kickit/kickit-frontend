import gql from 'graphql-tag'

//Mutation definition to match with serverside "login" mutation
const login = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const signup = gql`
  mutation SignupMutation($email: String!, $password: String!, $first: String!, $last: String!) {
    signup(first: $first, last: $last, email: $email, password: $password) {
      token
    }
  }
`

export { login, signup } 