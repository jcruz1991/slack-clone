import React, { Component } from 'react';
import AppLayout from '../components/AppLayout';
import Header from '../components/Header';
import SendInput from '../components/SendInput';
import MessageContainer from '../containers/MessageContainer';
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

                { channel && (
                    <Header
                      allTeams={team}
                      channelName={channel.name}
                    />
                )}

                { channel && (
                    <MessageContainer channelId={channel.id} />
                )}
                
                <SendInput 
                  channelName={channel.name}
                  channelId={channel.id}
                />
            </AppLayout>
        )
    }
}

export default graphql(allTeamsQuery)(ViewTeam);