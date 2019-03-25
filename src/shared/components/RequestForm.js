/**@jsx jsx */
import React, { Component } from 'react';
import { css, jsx } from '@emotion/core';
import { Flex, Box } from '@rebass/emotion';
import * as yup from 'yup';
import { TagsInput } from '.';
import { Button } from '../primitives';
import { Form } from './FormComponent';

const RequestFormValidation = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email()
    .required('Email is required'),
  budget: yup.string().required('Budget is required'),
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
    type: 'email',
    name: 'email',
    label: 'Email',
    placeholder: 'james.harden@gmail.com',
  },
  {
    type: 'tel',
    name: 'number',
    label: 'Phone number',
    placeholder: '08078654312',
  },
  {
    kind: 'select',
    label: 'Number of children',
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    name: 'no_of_children',
    mr: 2
  },
  {
    kind: 'select',
    label: 'Status',
    defaultText: 'Status',
    options: [['pending', 'Pending'], ['completed', 'Completed']],
    name: 'status',
  },
  {
    kind: 'select',
    label: 'Number of days',
    defaultText: 'Select duration',
    options: [1, 2, 3, 4, 5, 6, 7],
    name: 'no_of_days',
    mr: 2
  },
  {
    kind: 'select',
    label: 'Gender',
    defaultText: 'Any',
    options: [['M', 'Male'], ['F', 'Female']],
    name: 'gender',
  },
  {
    kind: 'select',
    label: 'Where you heard',
    defaultText: 'Select an option',
    options: [
      [0, 'Facebook'],
      [1, 'Search Engine (Google/Yahoo/Bing)'],
      [2, 'Friends, Family or Word of Mouth'],
      [3, 'Instagram'],
      [4, 'Linkedin'],
      [5, 'Saw a Flyer'],
      [6, 'At an Event'],
      [7, 'Spoke with an Agent'],
      [8, 'Youtube'],
      [9, 'Got an SMS'],
      [10, 'Twitter'],
      [11, 'Heard on Radio'],
      [12, 'Watched on TV'],
      [13, 'Nairaland'],
      [14, 'Read a Blog Post'],
      [15, 'Others'],
    ],
    name: 'how_you_heard',
    mr: 2
  },
  {
    kind: 'select',
    label: 'Request Type',
    defaultText: 'Select an option',
    options: [
      ['regular request', 'Regular Request'],
      ['group lesson', 'Group Lesson'],
    ],
    name: 'request_type',
  },
  {
    kind: 'select',
    label: 'Curriculum',
    defaultText: 'Select a curriculum',
    options: [['nigeiran', 'Nigerian'], ['british', 'British']],
    name: 'curriculum',
    mr: 2
  },
  {
    kind: 'select',
    label: 'No of Hours per day',
    defaultText: 'Select an option',
    options: [[1, '1 hour'], [1.5, '1 hour 30 minutes'], [2, '2 hours']],
    name: 'hours',
  },
  {
    name: 'address',
    label: 'Home address',
    placeholder: '12 Jones street',
  },
  {
    name: 'state',
    label: 'State',
    placeholder: 'Lagos',
  },
  {
    name: 'vicinity',
    label: 'Vicinity',
    placeholder: 'Lekki',
  },
  {
    kind: 'textarea',
    name: 'expectation',
    label: 'Expectation',
    placeholder:
      'I need my son to read fluently. He is age 7 and can hardly read a sentence on his own. So I need someone to help improve his reading.',
  },
  {
    type: 'number',
    name: 'budget',
    label: 'Budget',
    placeholder: '25000',
  },
  {
    type: 'checkbox',
    name: 'is_parent_request',
    label: 'Is parent request',
  },
  {
    name: 'days',
    kind: 'tagsInput',
    label: 'Available days',
  },
  {
    name: 'classes',
    kind: 'tagsInput',
    label: 'Class of Child',
  },
  {
    name: 'subjects',
    kind: 'tagsInput',
    label: 'Request Subjects',
  },
];

const formProps = {
  fields: formData,
  validationSchema: RequestFormValidation,
};

export const RequestForm = ({ onSubmit, initialValues, isLoading }) => {
  return (
    <Form
      {...formProps}
      onSubmit={values => onSubmit(values)}
      data={initialValues}
      render={(fields, button) => {
        return (
          <div
            css={css`
              label {
                padding-bottom: 4px;
                font-size: 14px;
              }
              input[type='text'],
              input[type='email'],
              input[type='date'],
              input[type='number'],
              input[type='tel'] {
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
                {fields.number}
              </Flex>
              <Flex>
                {fields.no_of_children}
                {fields.status}
              </Flex>
              <Flex>
                {fields.no_of_days}
                {fields.gender}
              </Flex>
              <Flex>
                {fields.how_you_heard}
                {fields.request_type}
              </Flex>
              <Flex>
                {fields.curriculum}
                {fields.hours}
              </Flex>
              <Box pb={3}>{fields.address}</Box>
              <Flex pb={3}>
                {fields.state}
                {fields.vicinity}
              </Flex>
              <Box pb={3}>{fields.expectation}</Box>
              <Box pb={3}>{fields.budget}</Box>
              <Box pb={3}>{fields.is_parent_request}</Box>

              {fields.days && (
                <Flex pb={3} flexDirection="column">
                  {fields.days}
                </Flex>
              )}
              {fields.classes && (
                <Flex pb={3} flexDirection="column">
                  {fields.classes}
                </Flex>
              )}
              {fields.subjects && (
                <Flex pb={5} flexDirection="column">
                  {fields.subjects}
                </Flex>
              )}
              {button}
              {/* <Button type="submit">Submit</Button> */}
            </Flex>
          </div>
        );
      }}
    />
  );
};

RequestForm.defaultProps = {
  onSubmit: values => console.log(values),
};

export default RequestForm;
