import React from 'react';
import { Modal, Input, Button, Form } from 'semantic-ui-react';
import { withFormik } from 'formik';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import normalizeErrors from '../normalizeErrors';

const InvitePeopleModal = ({ open, onClose,  values, handleChange, handleBlur, handleSubmit, isSubmitting, touched, errors }) => (
    <Modal 
      open={open} 
      onClose={onClose}
      style={{
        marginTop: '10%',
        marginLeft: '14%',
      }}
    >
        <Modal.Header>Add People To Your Team</Modal.Header>
        <Modal.Content image>
            <Modal.Description>
                <Form>
                    <Form.Field>
                        <Input 
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="email"
                          fluid
                          placeholder="User's email"
                        />
                    </Form.Field>
                    { touched.email && errors.email ? errors.email[0] : null }
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
                            Invite
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Description>
    </Modal.Content>
  </Modal>
);

const addTeamMemberMutation = gql`
    mutation($email: String!, $teamId: Int!) {
        addTeamMember(email: $email, teamId: $teamId) {
            ok
            errors {
                path
                message
            }
        }
    }
`;

export default compose(
    graphql(addTeamMemberMutation),
    withFormik({
        mapPropsToValues: () => ({ email: '' }),
        handleSubmit: async (values, { props: { onClose, teamId, mutate }, setSubmitting, setErrors },) => {
            const response = await mutate({ variables: { teamId, email: values.email }, });
            const { ok, errors } = response.data.addTeamMember;
            console.log(errors);
            if (ok) {
                onClose();
                setSubmitting(false);
            } else {
                setSubmitting(false);
                setErrors(normalizeErrors(errors));
            }
        },
    }),
)(InvitePeopleModal);

