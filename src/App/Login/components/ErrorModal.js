import React from 'react'
import { Message } from 'semantic-ui-react'

  //Generic Error 'message' component
export default (error) => {
    if(error.error !== ""){
      return (
        <Message warning>
          <Message.Header>Opps!</Message.Header>
          <p>{error.error}</p>
        </Message>
      )
    }
    return ''
}