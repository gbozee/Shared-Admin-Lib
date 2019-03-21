/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { Flex, Box } from '@rebass/emotion';
import React, { Component } from 'react';
import * as yup from 'yup';
import { Button } from '../primitives';
import { Form } from './FormComponent';

const BookingFormValidation = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  budget: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email()
    .required('Client is required'),
  number: yup.string().required('Phone number is required'),
  tutor: yup
    .string()
    .email()
    .required('Tutor is required'),
});

const formData = [
  {
    name: 'first_name',
    label: 'First name',
    placeholder: 'James',
  },
  {
    name: 'last_name',
    label: 'Last name',
    placeholder: 'Harden',
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'jamesharden@gmail.com',
  },
  {
    name: 'tutor',
    type: 'text',
    label: 'Tutor',
    placeholder: 'Ayobami',
  },
  // {
  //   name: 'first_session',
  //   type: 'date',
  //   label: 'First session',
  //   placeholder: 'First session',
  // },
  // {
  //   name: 'last_session',
  //   type: 'date',
  //   label: 'Last session',
  //   placeholder: 'Last session',
  // },
  {
    kind: 'select',
    name: 'status',
    defaultText: 'Select a status',
    options: [
      ['pending', 'Pending'],
      ['completed', 'Completed'],
      ['paid', 'Paid'],
    ],
    label: 'Status',
  },
  {
    kind: 'select',
    name: 'skill',
    defaultText: 'Select a skill',
    options: [['IELTS', 'IELTS'], ['English', 'English language']],
    label: 'Skill',
  },
  {
    name: 'budget',
    type: 'number',
    label: 'Budget',
    placeholder: '25000',
  },
  {
    name: 'number',
    type: 'text',
    label: 'Phone number',
    placeholder: '08100000000',
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
              {fields.first_name}
              {fields.last_name}
            </Flex>
            <Flex pb={3}>
              {fields.email}
              {fields.tutor}
            </Flex>
            <Flex pb={3}>
              {fields.number}
              {fields.budget}
            </Flex>
            <Flex pb={3}>
              <Box width="100%" mr={2}>
                {fields.status}
              </Box>
              <Box width="100%">{fields.skill}</Box>
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
