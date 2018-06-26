import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import Messages from '../components/Messages';

const MessageContainer = ({ data: { loading, messages } }) => 
( loading ? null : <Messages>{ JSON.stringify(messages) }</Messages>);

const MessagesQuery = gql`
    query ($channelId: Int!) {
        messages(channelId: $channelId) {
        id
        text
        user {
            username
        }
        createdAt
        }
    }  
`;

export default graphql(MessagesQuery, {
    variables: props => ({
        channelId: props.channelId,
    }) 
})(MessageContainer);