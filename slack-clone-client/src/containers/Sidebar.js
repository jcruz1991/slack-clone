import React, { Component } from 'react';
import decode from 'jwt-decode';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';


class Sidebar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      openAddChannelModel: false
    };
  }

  handleAddChannelClick = () => {
    this.setState({
      openAddChannelModel: true
    });
  }

  handleCloseAddChannelClick = () => {
    this.setState({
      openAddChannelModel: false
    });
  }

  render() {
    const { teams, team } = this.props;
    let { openAddChannelModel } = this.state;

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
        />
        <AddChannelModal
          teamId={team.id}
          open={openAddChannelModel} 
          onClose={this.handleCloseAddChannelClick}
        />
      </React.Fragment>
    );
  }
};

export default Sidebar;