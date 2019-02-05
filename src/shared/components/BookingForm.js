/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Flex, Box, Text } from '@rebass/emotion';
import React, { Component } from 'react';
import { TagsInput } from '.';
import { Button } from '../primitives';

const ErrorText = styled(Text)`
  color: red;
  font-size: 12px;
`;

const formFields = [
  'client',
  'tutor',
  'status',
  'budget',
  'first_session',
  'last_session',
];

export class BookingForm extends Component {
  state = {
    fields: this.props.fields || {},
    error: false,
  };
  displayError = field => {
    const { fields, error } = this.state;
    if (formFields.includes(field)) {
      return error && !Boolean(fields[field]);
    }
  };
  isValid = () => {
    const { fields } = this.state;
    return formFields.every(x => Boolean(fields[x]));
  };
  onChange = (field, callback) => e => {
    let result = callback(e);
    this.setState(({ fields }) => ({
      fields: {
        ...fields,
        [field]: result,
      },
    }));
  };
  onSubmit = e => {
    e.preventDefault();
    const { fields } = this.state;
    if (this.isValid()) {
      this.props.onSubmit(fields);
    } else {
      this.setState({
        error: true,
      });
    }
  };
  render() {
    const { fields, error } = this.state;
    const { onCancel } = this.props;
    return (
      <form
        onSubmit={this.onSubmit}
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
            <Flex flexDirection="column" width="100%" mr={2}>
              <label>Client</label>
              <input
                type="email"
                placeholder="jamesharden@gmail.com"
                value={fields.client}
                onChange={this.onChange('client', e => e.target.value)}
              />
              {this.displayError('client') && (
                <ErrorText>This field is required</ErrorText>
              )}
            </Flex>
            <Flex flexDirection="column" width="100%" ml={2}>
              <label>Tutor</label>
              <input
                type="email"
                placeholder="jamesharden@gmail.com"
                value={fields.tutor}
                onChange={this.onChange('tutor', e => e.target.value)}
              />
              {this.displayError('tutor') && (
                <ErrorText>This field is required</ErrorText>
              )}
            </Flex>
          </Flex>
          <Flex pb={3}>
            <Flex flexDirection="column" width="100%" mr={2}>
              <label>First Session</label>
              <input
                type="date"
                placeholder="First session"
                value={fields.first_session}
                onChange={this.onChange('first_session', e => e.target.value)}
              />
              {this.displayError('first_session') && (
                <ErrorText>This field is required</ErrorText>
              )}
            </Flex>
            <Flex flexDirection="column" width="100%" ml={2}>
              <label>Last Session</label>
              <input
                type="date"
                placeholder="First session"
                value={fields.last_session}
                onChange={this.onChange('last_session', e => e.target.value)}
              />
              {this.displayError('last_session') && (
                <ErrorText>This field is required</ErrorText>
              )}
            </Flex>
          </Flex>
          <Flex pb={3}>
            <Flex flexDirection="column" width="100%" mr={2}>
              <label>Status</label>
              <select
                value={fields.status}
                onChange={this.onChange('status', e => e.target.value)}
              >
                <option>Select Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>>
              </select>
              {this.displayError('status') && (
                <ErrorText>This field is required</ErrorText>
              )}
            </Flex>
            <Flex flexDirection="column" width="100%" ml={2}>
              <label>Skill</label>
              <select
                value={fields.skill}
                onChange={this.onChange('skill', e => e.target.value)}
              >
                <option>Select Skill</option>
                <option value="ielts">IELTS</option>
                <option value="english">English Language</option>>
              </select>
              {this.displayError('skill') && (
                <ErrorText>This field is required</ErrorText>
              )}
            </Flex>
          </Flex>
          <Flex pb={3} flexDirection="column">
            <label>Budget</label>
            <input
              type="number"
              value={fields.budget}
              placeholder="25000"
              onChange={this.onChange('budget', e => e.target.value)}
            />
            {this.displayError('budget') && (
              <ErrorText>This field is required</ErrorText>
            )}
          </Flex>
          <Flex pb={3}>
            <Flex flexDirection="column" mr={2}>
              <label for="is-group">
                <input
                  type="checkbox"
                  name="is-group"
                  value={fields.is_group}
                  onChange={this.onChange('is_group', e => e.target.value)}
                />
                Is group
              </label>
            </Flex>
            <Flex flexDirection="column" mr={2}>
              <label for="paid-tutor">
                <input
                  type="checkbox"
                  name="paid-tutor"
                  value={fields.paid_tutor}
                  onChange={this.onChange('paid_tutor', e => e.target.value)}
                />
                Paid tutor
              </label>
            </Flex>
            <Flex flexDirection="column" mr={2}>
              <label for="made-payment">
                <input
                  type="checkbox"
                  name="made-payment"
                  value={fields.made_payment}
                  onChange={this.onChange('made_payment', e => e.target.value)}
                />
                Made payment
              </label>
            </Flex>
          </Flex>
          <Flex justifyContent="space-between">
            <Button type="submit">Submit</Button>
            {onCancel && (
              <Button type="button" onClick={onCancel} ml={3}>
                Cancel
              </Button>
            )}
          </Flex>
        </Flex>
      </form>
    );
  }
}

export default BookingForm;
