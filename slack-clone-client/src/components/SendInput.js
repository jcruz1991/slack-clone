import React from 'react';
import { Input } from 'semantic-ui-react';
import styled from 'styled-components';


const SendInputWrapper = styled.div`
    grid-column: 3;
    grid-row: 3;
`;

export default ({ channelName }) => (
    <SendInputWrapper>
        <Input 
          fluid
          placeholder={`Message #${channelName}`}
          size='large'
          icon='send'
        />
    </SendInputWrapper>
);