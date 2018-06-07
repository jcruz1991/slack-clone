import React, { Component } from 'react';

import Channels from '../components/Channels';
import AppLayout from '../components/AppLayout';
import Header from '../components/Header';
import SendInput from '../components/SendInput';
import Messages from '../components/Messages';
import Teams from '../components/Teams';


class ViewTeam extends Component {
    render() {
        return(
            <AppLayout>
                <Teams
                  teams={[{id: 1, letter:"T"}, {id: 2, letter:"B"}]}
                />
                <Channels 
                  teamName='Team Name'  
                  username='Username' c
                  channels={[{id: 1, name:"general"}, {id: 2, name:"random"}]}
                  users={[{id: 1, name:"slackbot"}, {id: 2, name:"user1"}]}
                />
                <Header
                 channelName="general"
                />
                <Messages>
                    <ul class="message-list">
                    <li></li>
                    <li></li>
                    </ul>
                </Messages>
                <SendInput 
                  channelName="general"
                />
            </AppLayout>
        )
    }
}

export default ViewTeam;