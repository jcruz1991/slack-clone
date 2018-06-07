import React, { Component } from 'react';
import AppLayout from '../components/AppLayout';
import Header from '../components/Header';
import SendInput from '../components/SendInput';
import Messages from '../components/Messages';
import Sidebar from '../containers/Sidebar';


class ViewTeam extends Component {
    render() {
        return(
            <AppLayout>
                <Sidebar currentTeamId={1} />
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