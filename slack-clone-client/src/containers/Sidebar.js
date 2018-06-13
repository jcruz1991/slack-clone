import React, { Component } from 'react';
import decode from 'jwt-decode';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';
import InvitePeopleModal from '../components/InvitePeopleModal';



class Sidebar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      openAddChannelModal: false,
      openInvitePeopleModal: false
    };
  }

  handleAddChannelClick = () => {
    this.setState({
      openAddChannelModal: true
    });
  }

  handleCloseAddChannelClick = () => {
    this.setState({
      openAddChannelModal: false
    });
  }

  handleInvitePeopleClick = () => {
    this.setState({
      openInvitePeopleModal: true
    });
  }

  handleCloseInvitePeopleClick = () => {
    this.setState({
      openInvitePeopleModal: false
    });
  }

  render() {
    const { teams, team } = this.props;
    let { openAddChannelModal, openInvitePeopleModal } = this.state;

    let username = '';

    try {
      const token = localStorage.getItem('token');
      const { user } = decode(token);
      username = user.username;
    } catch (err) {
      console.log(err);
    }

    return(
      <React.Fragment>
        <Teams
          key="team-sidebar"
          teams={teams}
        />
        
        <Channels
          key="channels-sidebar"
          teamName={team.name}
          username={username}
          teamId={team.id}
          channels={team.channels}
          users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
          onAddChannelClick={this.handleAddChannelClick}
          onInvitePeopleClick={this.handleInvitePeopleClick}
        />
        <AddChannelModal
          teamId={team.id}
          open={openAddChannelModal} 
          onClose={this.handleCloseAddChannelClick}
        />
        <InvitePeopleModal
          teamId={team.id}
          open={openInvitePeopleModal} 
          onClose={this.handleCloseInvitePeopleClick}
        />
      </React.Fragment>
    );
  }
};

export default Sidebar;