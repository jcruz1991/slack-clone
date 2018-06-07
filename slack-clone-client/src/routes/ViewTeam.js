import React, { Component } from 'react';

import Channels from '../components/Channels';
import AppLayout from '../components/AppLayout';
import Header from '../components/Header';
import Input from '../components/Input';
import Messages from '../components/Messages';
import Teams from '../components/Teams';


class ViewTeam extends Component {
    render() {
        return(
            <AppLayout>
                <Teams>Teams</Teams>
                <Channels>Channels</Channels>
                <Header>Header</Header>
                <Messages>
                    <ul class="message-list">
                    <li></li>
                    <li></li>
                    </ul>
                </Messages>
                <Input>
                    <input type="text" placeholder="CSS Grid Layout Module" />
                </Input>
            </AppLayout>
        )
    }
}

export default ViewTeam;