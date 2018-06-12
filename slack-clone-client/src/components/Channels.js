import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const ChannelWrapper = styled.div`
    grid-column: 2;
    grid-row: 1 / 4;
    background-color: #4E3A4C;
    color: #958993;
`;

const ChannelHeader = styled.div`
    padding-left: 10px;
`;

const TeamNameHeader = styled.h1`
    color: #FFF;
    font-size: 20px;
`;

const SidebarList = styled.ul`
    width: 100%;
    padding-left: 0;
    list-style: none;
`;

const SidebareListHeader = styled.li`
    padding-left: 10px;
    font-size: 16px;
`;

const SidebarListItem = styled.li`
    padding: 2px 2px 2px 10px;
    color: #948994;
    &:hover {
        cursor: pointer;
        background: #3e313c;
    }
`;

const Green = styled.span`color: #38978d;`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○');

const channel = ({ id, name }, teamId) => (
    <Link to={`/view-team/${teamId}/${id}`} key={`channel-${id}`}>
        <SidebarListItem>{ `#${name}` }</SidebarListItem>
    </Link>
);

const user= ({ id, name }) => (
    <SidebarListItem key={ `user-${id}` }>
        <Bubble /> {name}
    </SidebarListItem>
);


export default ({ teamName, username, channels, users, onAddChannelClick, teamId }) => (
    <ChannelWrapper>
        <ChannelHeader>
            <TeamNameHeader>{ teamName }</TeamNameHeader>
            { username }
        </ChannelHeader>
        <div>
            <SidebarList>
                <SidebareListHeader>Channels <Icon onClick={onAddChannelClick} name='add circle' /></SidebareListHeader>
                { channels.map((c) => channel(c, teamId)) }
            </SidebarList>
        </div>
        <div>
            <SidebarList>
                <SidebareListHeader>Direct Message</SidebareListHeader>
                { users.map(user) }
            </SidebarList>
        </div>
    </ChannelWrapper>
)