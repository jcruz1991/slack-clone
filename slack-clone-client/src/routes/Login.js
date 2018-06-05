import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Container, Header, Input, Button } from 'semantic-ui-react';

export default observer(class Login extends Component {

    constructor(props) {
        super(props);

        extendObservable(this, {
            email: '',
            password: ''
        });
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this[name] = value;
    }

    onSubmit = () => {
        const { email, password } = this;

        console.log(email);
        console.log(password);
    }

    render() {

        const { email, password } = this;
        return(
            <Container text>
            <Header as='h2'>Login</Header>
            <Input 
              name='email'
              value={ email } 
              fluid 
              placeholder='Email' 
              onChange={this.onChange} 
            />

            <Input
              name='password'
              value={ password } 
              fluid 
              placeholder='Password' 
              type='password' 
              onChange={this.onChange} 
            />
            <Button onClick={this.onSubmit}>Submit</Button>
        </Container>
        )
    }
});