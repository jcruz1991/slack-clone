import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Container, Header, Input, Button, Form, Message } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";

class CreateTeam extends Component {

    constructor(props) {
        super(props);

        extendObservable(this, {
            name: '',
            errors: {},
        });
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this[name] = value;
    }

    onSubmit = async () => {
        const { name } = this;

        let response = null;

        try{
            response = await this.props.mutate({
                variables: { name },
            });

            console.log(response);
            
        } catch(err) {
            this.props.history.push('/login');
            return;
        }

        const { ok, errors, team } = response.data.createTeam;

        if(ok) {
            this.props.history.push(`/view-team/${team.id}`);
        } else {
            const err = {};
            errors.forEach(({ path, message }) => {
              // err['passwordError'] = 'too long..';
              err[`${path}Error`] = message;
            });
            this.errors = err;
            console.log(this.errors);
        }
    }

    render() {

        const { name, errors: { nameError, } } = this;

        const errorList = [];

        if(nameError) {
            errorList.push(nameError);
        }

        return(
            <Container text>
            <Header as='h2'>Create A Team</Header>
            <Form>
                <Form.Field error={!!nameError}>
                    <Input 
                      name='name'
                      value={ name } 
                      fluid 
                      placeholder='Team Name' 
                      onChange={this.onChange} 
                    />
                </Form.Field>
                <Button onClick={this.onSubmit}>Submit</Button>
            </Form>
            
            {errorList.length ? (
                <Message
                  error
                  header='There was an error on submission'
                  list={errorList}
                />) : null
            }

        </Container>
        )
    }
}

const createTeamMutation = gql`
    mutation($name: String!) {
        createTeam(name: $name) {
            ok
            team {
                id
            }
            errors {
                path
                message
            }
        }
    }
`;

export default graphql(createTeamMutation)(observer(CreateTeam));