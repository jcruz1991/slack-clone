import React from 'react';
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';


const HeaderWrapper = styled.div`
    grid-column: 3;
    grid-row: 1;
`;

export default ({ channelName }) => (
    <HeaderWrapper>
        <Header as="h1" textAlign="center">#{ channelName }</Header>
    </HeaderWrapper>
);