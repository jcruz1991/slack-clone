import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Container, Header, Input, Button, Form, Message } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";

class Login extends Component {

    constructor(props) {
        super(props);

        extendObservable(this, {
            email: '',
            password: '',
            errors: {},
        });
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this[name] = value;
    }

    onSubmit = async () => {
        const { email, password } = this;

        const response = await this.props.mutate({
            variables: { email, password },
        });

        console.log(response);

        const { ok, errors, token, refreshToken } = response.data.login;

        if(ok) {
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            this.props.history.push('/');
        } else {
            const err = {};

            errors.forEach(({ path, message }) => {
              // err['passwordError'] = 'too long..';
              err[`${path}Error`] = message;
            });
      
            this.errors = err;
        }
    }

    render() {

        const { email, password, errors: { emailError, passwordError } } = this;

        const errorList = [];

        if(emailError) {
            errorList.push(emailError);
        }
        if(passwordError) {
            errorList.push(passwordError);
        }

        return(
            <Container text>
            <Header as='h2'>Login</Header>
            <Form>

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
            
            {errorList.length ? (
                <Message
                  error
                  header='Unable to register'
                  list={errorList}
                />) : null
            }

        </Container>
        )
    }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(loginMutation)(observer(Login));