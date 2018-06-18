import React from 'react'
import { Button, Input, Form } from 'semantic-ui-react'

//2 input boxes for email and password and a button 
export default ({ state, handleChange, attemptLogin }) => {
    return (
      <div className="container">
      <h3>Login</h3>
      <Form>
        <Form.Field>
          <Input 
            value={state.email}
            onChange={ handleChange }
            placeholder='Email'
            name= 'email'/>
        </Form.Field>
        <Form.Field>
          <Input 
            value={ state.password } 
            onChange={ handleChange } 
            placeholder='Password' 
            type='password'
            name= 'password'/>
        </Form.Field>
        <Form.Field>
          <Button 
            type='submit' 
            onClick={() => attemptLogin()}  
            color='yellow'>Login</Button>
        </Form.Field>
      </Form>
      </div>
    )
}