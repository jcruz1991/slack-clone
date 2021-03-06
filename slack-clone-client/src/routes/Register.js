import React, { Component } from 'react';
import { Container, Header, Input, Button, Message, Form } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";


class Register extends Component {

    constructor() {
        super();

        this.state = {
            username: '',
            usernameError: '',
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
        };
    }

    onChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }

    onSubmit = async () => {

        // reset errors
        this.setState({
            usernameError: '',
            emailError: '',
            passwordError: '',
          });
      
          const { username, email, password } = this.state;

          const response = await this.props.mutate({
            variables: { username, email, password },
          });
      
          const { ok, errors } = response.data.register;
      
          if (ok) {
            this.props.history.push('/');
          } else {
            const err = {};

            errors.forEach(({ path, message }) => {
              // err['passwordError'] = 'too long..';
              err[`${path}Error`] = message;
            });
      
            this.setState(err);
          }
      
          console.log(response);
    }

    render() {

        const { username, email, password, usernameError, emailError, passwordError } = this.state;

        const errorList = [];

        if(usernameError) {
            errorList.push(usernameError);
        }
        if(emailError) {
            errorList.push(emailError);
        }
        if(passwordError) {
            errorList.push(passwordError);
        }

        return(
            <Container text>
                <Header as='h2'>Register</Header>
                <Form>
                    <Form.Field error={!!usernameError}>
                        <Input 
                          name='username'
                          value={ username } 
                          fluid 
                          placeholder='Username' 
                          onChange={this.onChange} 
                        />
                    </Form.Field>

                    <Form.Field error={!!emailError}>
                        <Input
                          name='email'
                          value={ email } 
                          fluid 
                          placeholder='Email' 
                          onChange={this.onChange} 
                        />
                    </Form.Field>

                    <Form.Field error={!!passwordError}>
                        <Input
                          name='password'
                          value={ password } 
                          fluid 
                          placeholder='Password' 
                          type='password' 
                          onChange={this.onChange} 
                        />
                    </Form.Field>
                    <Button onClick={this.onSubmit}>Submit</Button>
                </Form>

                {errorList.length ? (<Message
                      error
                      header='Unable to register'
                      list={errorList}
                    />) : null
                }

            </Container>
        )
    }
}

const registerMutation = gql`
    mutation($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            ok
            errors{
                path
                message
            }
        }
    }
`;

export default graphql(registerMutation)(Register);