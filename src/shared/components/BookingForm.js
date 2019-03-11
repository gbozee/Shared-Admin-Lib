/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { Flex, Box } from '@rebass/emotion';
import React, { Component } from 'react';
import * as yup from 'yup';
import { Button } from '../primitives';
import { Form } from './FormComponent';

const BookingFormValidation = yup.object().shape({
  client: yup
    .string()
    .email()
    .required('Client is required'),
  tutor: yup
    .string()
    .email()
    .required('Tutor is required'),
});

const formData = [
  {
    name: 'client',
    type: 'email',
    label: 'Client',
    placeholder: 'jamesharden@gmail.com',
  },
  {
    name: 'tutor',
    type: 'email',
    label: 'Tutor',
    placeholder: 'jamesharden@gmail.com',
  },
  {
    name: 'first_session',
    type: 'date',
    label: 'First session',
    placeholder: 'First session',
  },
  {
    name: 'last_session',
    type: 'date',
    label: 'Last session',
    placeholder: 'Last session',
  },
  {
    kind: 'select',
    name: 'status',
    defaultText: 'Select a status',
    options: [['pending', 'Pending'][('completed', 'Completed')]],
    label: 'Status',
  },
  {
    kind: 'select',
    name: 'skill',
    defaultText: 'Select a skill',
    options: [['ielts', 'IELTS'][('English', 'English language')]],
    label: 'Skill',
  },
  {
    name: 'budget',
    type: 'number',
    label: 'Budget',
    placeholder: '25000',
  },
  {
    name: 'budget',
    type: 'number',
    label: 'Budget',
    placeholder: '25000',
  },
  {
    name: 'is_group',
    type: 'checkbox',
    label: 'Is group',
  },
  {
    name: 'paid_tutor',
    type: 'checkbox',
    label: 'Paid tutor',
  },
  {
    name: 'made_payment',
    type: 'checkbox',
    label: 'Made payment',
  },
];

export const BookingForm = ({ onSubmit, initialValues, onCancel }) => {
  return (
    <Form
      data={initialValues}
      fields={formData}
      validationSchema={BookingFormValidation}
      onSubmit={values => onSubmit(values)}
      render={(fields, button) => (
        <div
          css={css`
            label {
              padding-bottom: 4px;
              font-size: 14px;
            }
            input[type='text'],
            input[type='email'],
            input[type='date'],
            input[type='number'] {
              padding: 0 12px;
              height: 30px;
            }
            select {
              padding: 0 12px;
              height: 35px;
            }
          `}
        >
          <Flex flexDirection="column">
            <Flex pb={3}>
              {fields.client}
              {fields.tutor}
            </Flex>
            <Flex pb={3}>
              {fields.first_session}
              {fields.last_session}
            </Flex>
            <Flex pb={3}>
              <Box width="100%" mr={2}>{fields.status}</Box>
              <Box width="100%">{fields.skill}</Box>
            </Flex>
            <Flex pb={3} flexDirection="column">
              {fields.budget}
            </Flex>
            <Flex pb={3}>
              <Flex flexDirection="column" mr={2}>
                {fields.is_group}
              </Flex>
              <Flex flexDirection="column" mr={2}>
                {fields.paid_tutor}
              </Flex>
              <Flex flexDirection="column" mr={2}>
                {fields.made_payment}
              </Flex>
            </Flex>
            <Flex justifyContent="space-between">
              {button}
              {onCancel && (
                <Button type="button" onClick={onCancel} ml={3}>
                  Cancel
                </Button>
              )}
            </Flex>
          </Flex>
        </div>
      )}
    />
  );
};

BookingForm.defaultProps = {
  onSubmit: values => console.log(values),
};

export default BookingForm;
