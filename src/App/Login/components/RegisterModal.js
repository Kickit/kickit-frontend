import React from 'react'
import { Button, Input, Form } from 'semantic-ui-react'


// RegistrationModal: Registration form
export default ({ state, handleChange, updateStep, attemptRegister }) => {
    switch(state.step) {
      case 1:
        return (
          <div className="container">
          <h3>Register</h3>
          <Form>
            <Form.Field>
              <Input 
                value={state.email} 
                onChange={ handleChange } 
                placeholder='Email'
                name='email' 
              />
            </Form.Field>
            <Form.Field>
              <Button 
                onClick={() => updateStep(1)} 
                color='yellow'>Next {'>'}</Button>
            </Form.Field>
          </Form>
          </div>
        )
      case 2:
        return (
          <div className="container">
          <h3>Register</h3>
          <Form>
            <Form.Field>
              <Input 
                value={state.first} 
                onChange={ handleChange } 
                placeholder='First Name' 
                name='first'
              />
            </Form.Field>
            <Form.Field>
              <Input 
                value={ state.last } 
                onChange={ handleChange } 
                placeholder='Last Name'
                name='last'
              />
            </Form.Field>
            <Form.Field>
              <Input 
                value={state.password} 
                onChange={ handleChange } 
                placeholder='Password' type='password' 
                name='password'
              />
            </Form.Field>
            <Form.Field>
              <Button 
                onClick={() => updateStep(-1)} 
                color='blue'> 
                {'<'} Back
              </Button>
              <Button 
                type='submit' 
                onClick={() => attemptRegister()} 
                color='yellow'>Register</Button>
            </Form.Field>
          </Form>
          </div>
        )
      case 3:
        return (
          <div className="container">
          <h3>Thankyou for Registering!</h3>
          <a> If you are not redirected to application click here</a>
          
          </div>
        )
      default:
        return null
    }
}