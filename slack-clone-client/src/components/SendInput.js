import React from 'react';
import { Input } from 'semantic-ui-react';
import { withFormik } from 'formik';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';


const SendInputWrapper = styled.div`
    grid-column: 3;
    grid-row: 3;
    padding: 20px 20px 10px 20px;
`;

const ENTER_KEY = 13;

const SendInput = ({ 
    channelName,
    values,
    handleChange, 
    handleBlur, 
    handleSubmit, 
    isSubmitting,
}) => (
    <SendInputWrapper>
        <Input 
          name='message'
          value={values.message}
          fluid
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={`Message #${channelName}`}
          size='large'
          icon='send'
          onKeyDown={(e) => {
              if(e.keyCode === ENTER_KEY && !isSubmitting) {
                  handleSubmit(e);
                }
            }
          }
        />
    </SendInputWrapper>
);

const createMessageMutation = gql`
    mutation ($channelId: Int!, $text: String!) {
        createMessage(channelId: $channelId, text: $text)
    }
`;

export default compose(
    graphql(createMessageMutation),
    withFormik({
      mapPropsToValues: () => ({ message: '' }),
      handleSubmit: async (values, { props: { channelId, mutate }, setSubmitting, resetForm }) => {
        if (!values.message || !values.message.trim()) {
          setSubmitting(false);
          return;
        }
        await mutate({
          variables: { channelId, text: values.message },
        });
        resetForm(false);
      },
    }),
  )(SendInput);