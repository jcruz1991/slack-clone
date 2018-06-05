import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";


const allUsersQuery = gql`
    {
        allUsers {
            id
            email
        }
    }
`;

class Home extends Component {

    render() {

        const loading = this.props.data.loading;
        const allUsers = this.props.data.allUsers;

        console.log(this.props.data);
        return(
            loading ? null : 
                <div>
                    { allUsers.map( user => <h1 key={ user.id }>{user.email}</h1>) }
                </div>
        )
    }
}

export default graphql(allUsersQuery)(Home);