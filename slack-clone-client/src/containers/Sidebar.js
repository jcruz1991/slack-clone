import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";
import _ from 'lodash';
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
    const { data: { loading, allTeams }, currentTeamId } = this.props;
    let { openAddChannelModel } = this.state;

    if (loading) {
      return null;
    }

    const teamIndex = currentTeamId ? _.findIndex(allTeams, ['id', parseInt(currentTeamId, 10)]) : 0;
    const team = allTeams[teamIndex];
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
          teams={allTeams.map(t => ({
            id: t.id,
            letter: t.name.charAt(0).toUpperCase(),
          }))}
        />
        
        <Channels
          key="channels-sidebar"
          teamName={team.name}
          username={username}
          channels={team.channels}
          users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
          onAddChannelClick={this.handleAddChannelClick}
        />
        <AddChannelModal
          teamId={currentTeamId}
          open={openAddChannelModel} 
          onClose={this.handleCloseAddChannelClick}
        />
      </React.Fragment>
    );
  }
};

const allTeamsQuery = gql`
    {
      allTeams {
        id
        name
        channels {
          id
          name
        }
      }
    }
  `;
  
  export default graphql(allTeamsQuery)(Sidebar);