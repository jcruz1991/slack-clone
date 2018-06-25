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

  toggleAddChannelModal = (e) => {
    if(e) {
      e.preventDefault();
    }
    this.setState({
      openAddChannelModal: !this.state.openAddChannelModal
    });
  }

  toggleInvitePeopleModal = (e) => {
    if(e) {
      e.preventDefault();
    }
    this.setState({
      openInvitePeopleModal: !this.state.openInvitePeopleModal
    });
  }

  render() {
    const { teams, team } = this.props;
    let { openAddChannelModal, openInvitePeopleModal } = this.state;

    let username = '';
    let isOwner = false;
    try {
      const token = localStorage.getItem('token');
      const { user } = decode(token);
      username = user.username;
      isOwner = user.id === team.owner;
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
          isOwner={isOwner}
          channels={team.channels}
          users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
          onAddChannelClick={this.toggleAddChannelModal}
          onInvitePeopleClick={this.toggleInvitePeopleModal}
        />
        <AddChannelModal
          teamId={team.id}
          open={openAddChannelModal} 
          onClose={this.toggleAddChannelModal}
        />
        <InvitePeopleModal
          teamId={team.id}
          open={openInvitePeopleModal} 
          onClose={this.toggleInvitePeopleModal}
        />
      </React.Fragment>
    );
  }
};

export default Sidebar;