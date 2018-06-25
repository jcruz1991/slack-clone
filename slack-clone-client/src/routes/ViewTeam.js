import React, { Component } from 'react';
import AppLayout from '../components/AppLayout';
import Header from '../components/Header';
import SendInput from '../components/SendInput';
import Messages from '../components/Messages';
import Sidebar from '../containers/Sidebar';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';

import { graphql } from 'react-apollo';
import { allTeamsQuery } from '../graphql/team';
class ViewTeam extends Component {

    render() {

        const { data: { loading, allTeams, inviteTeams }, match: { params: { teamId, channelId } } } = this.props;


        if(loading) {
            return null; // blank screen
        }

        const teams = [...allTeams, ...inviteTeams];

        if(!teams.length) {
            return <Redirect to='/create-team' />;
        }

        console.log(teams);

        const teamIndex = teamId ? _.findIndex(teams, ['id', parseInt(teamId, 10)]) : 0;
        const team = teams[teamIndex];

        const channelIndex =  channelId ? _.findIndex(team.channels, ['id', parseInt(channelId, 10)]) : 0;
        const channel = team.channels[channelIndex];

        return(
            <AppLayout>
                <Sidebar 
                  allTeams={teams}
                  teams={teams.map(t => ({
                    id: t.id,
                    letter: t.name.charAt(0).toUpperCase(),
                  }))}
                  team={team}
                />

                <Header
                  allTeams={team}
                  channelName={channel.name}
                />

                <Messages
                  channelId={channel.id}
                >
                    <ul className="message-list">
                    <li></li>
                    <li></li>
                    </ul>
                </Messages>
                
                <SendInput 
                  channelName={channel.name}
                />
            </AppLayout>
        )
    }
}

export default graphql(allTeamsQuery)(ViewTeam);