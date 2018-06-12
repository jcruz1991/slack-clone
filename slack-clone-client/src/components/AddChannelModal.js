import React from 'react';
import { Modal, Input, Button, Form } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';

import { allTeamsQuery } from '../graphql/team';

const AddChannelModal = ({ open, onClose,  values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
    <Modal 
      open={open} 
      onClose={onClose}
      style={{
        marginTop: '10%',
        marginLeft: '14%',
      }}
    >
        <Modal.Header>Add Channel</Modal.Header>
        <Modal.Content image>
            <Modal.Description>
                <Form>
                    <Form.Field>
                        <Input 
                          name='name' 
                          fluid  
                          placeholder='Channel name'
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                    </Form.Field>
                    <Form.Group widths="equal">
                        <Button 
                          fluid
                          onClose={onClose}
                          disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button 
                          fluid 
                          type='submitting' 
                          disabled={isSubmitting}
                          onClick={handleSubmit}
                        >
                            Create Channel
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Description>
    </Modal.Content>
  </Modal>
);

const createChannelMutation = gql`
    mutation($teamId: Int!, $name: String!) {
        createChannel(teamId: $teamId, name: $name) {
            ok
            channel {
                id
                name
            }
        }
    }
`;

export default compose(
    graphql(createChannelMutation),
    withFormik({
        mapPropsToValues: () => ({ name: '' }),
        handleSubmit: async (values, { props: { onClose, teamId, mutate }, setSubmitting }) => {
            await mutate({ 
                variables: { teamId, name: values.name },
                optimisticResponse: {
                    createChannel: {
                        __typename: "Mutation",
                        ok: true,
                        channel: {
                            __typename: "Channel",
                            id: -1,
                            name: values.name
                        },
                    }
                  },
                update: (proxy, { data: { createChannel } }) => {
                    const { ok, channel } = createChannel;
                    if(!ok) {
                        return;      
                    }
                    // Read the data from our cache for this query.
                    const data = proxy.readQuery({ query: allTeamsQuery });
                    console.log(data);
                    // Add our channel from the mutation to the end.
                    const teamIndex = _.findIndex(data.allTeams, ['id', teamId]);
                    data.allTeams[teamIndex].channels.push(channel);
                    // Write our data back to the cache.
                    proxy.writeQuery({ query: allTeamsQuery, data });
                  },
            });
            onClose();
            setSubmitting = false;
        },
    }),
)(AddChannelModal);

