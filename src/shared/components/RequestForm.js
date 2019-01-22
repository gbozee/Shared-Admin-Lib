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
  'first_name',
  'last_name',
  'email',
  'phone',
  'no_of_children',
  'status',
  'no_of_days',
  'gender',
  'how_you_heard',
  'request_type',
  'curriculum',
  'hours',
  'address',
  'state',
  'vicinity',
  'expectation',
  'budget',
];

export class RequestForm extends Component {
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
    return (
      <form
        onSubmit={this.onSubmit}
        css={css`
          label {
            padding-bottom: 4px;
            font-size: 14px;
          }
        `}
      >
        <Flex flexDirection="column">
          <Flex pb={3}>
            <Flex flexDirection="column" width="100%" mr={2}>
              <label>First name</label>
              <input
                type="text"
                placeholder="James"
                value={fields.first_name}
                onChange={this.onChange('first_name', e => e.target.value)}
              />
              {this.displayError('first_name') && (
                <ErrorText>This field is required</ErrorText>
              )}
            </Flex>
            <Flex flexDirection="column" width="100%" ml={2}>
              <label>Last name</label>
              <input
                type="text"
                placeholder="Harden"
                value={fields.last_name}
                onChange={this.onChange('last_name', e => e.target.value)}
              />
              {this.displayError('last_name') && (
                <ErrorText>This field is required</ErrorText>
              )}
            </Flex>
          </Flex>
          <Flex pb={3}>
            <Flex flexDirection="column" width="100%" mr={2}>
              <label>Email address</label>
              <input
                type="email"
                placeholder="jamesharden@gmail.com"
                value={fields.email}
                onChange={this.onChange('email', e => e.target.value)}
              />
              {this.displayError('email') && (
                <ErrorText>This field is required</ErrorText>
              )}
            </Flex>
            <Flex flexDirection="column" width="100%" ml={2}>
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="08078654312"
                value={fields.phone}
                onChange={this.onChange('phone', e => e.target.value)}
              />
              {this.displayError('phone') && (
                <ErrorText>This field is required</ErrorText>
              )}
            </Flex>
          </Flex>
          <Flex pb={3} flexDirection="column">
            <label>Number of students</label>
            <select
              value={fields.no_of_children}
              onChange={this.onChange('no_of_children', e => e.target.value)}
            >
              <option>Select No of students</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            {this.displayError('no_of_children') && (
              <ErrorText>This field is required</ErrorText>
            )}
          </Flex>
          <Flex pb={3} flexDirection="column">
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
          <Flex pb={3} flexDirection="column">
            <label>Days per week</label>
            <select
              value={fields.no_of_days}
              onChange={this.onChange('no_of_days', e => e.target.value)}
            >
              <option>Select duration</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
            {this.displayError('days') && (
              <ErrorText>This field is required</ErrorText>
            )}
          </Flex>
          <Flex pb={3} flexDirection="column">
            <label>Gender</label>
            <select
              value={fields.gender}
              onChange={this.onChange('gender', e => e.target.value)}
            >
              <option value="any">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {this.displayError('gender') && (
              <ErrorText>This field is required</ErrorText>
            )}
          </Flex>
          <Flex pb={3} flexDirection="column">
            <label>Where you heard</label>
            <select
              value={fields.how_you_heard}
              onChange={this.onChange('how_you_heard', e => e.target.value)}
            >
              <option>Select an option</option>
              <option value="0">Facebook</option>
              <option value="1">Search Engine (Google/Yahoo/Bing)</option>
              <option value="2">Friends, Family or Word of Mouth</option>
              <option value="3">Instagram</option>
              <option value="4">LinkedIn</option>
              <option value="5">Saw a Flyer</option>
              <option value="6">At an Event</option>
              <option value="7">Spoke with an Agent</option>
              <option value="8">Youtube</option>
              <option value="9">Got an SMS</option>
              <option value="10">Twitter</option>
              <option value="11">Heard on Radio</option>
              <option value="12">Watched on TV</option>
              <option value="13">Nairaland</option>
              <option value="14">Read a Blog Post</option>
              <option value="15">Others</option>
            </select>
          </Flex>
          <Flex pb={3} flexDirection="column">
            <label>Request Type</label>
            <select
              value={fields.request_type}
              onChange={this.onChange('request_type', e => e.target.value)}
            >
              <option>Select an option</option>
              <option value="regular request">Regular Request</option>
              <option value="group lessons">Group lessons</option>
            </select>
            {this.displayError('request_type') && (
              <ErrorText>This field is required</ErrorText>
            )}
          </Flex>
          <Flex pb={3} flexDirection="column">
            <label>Curriculum</label>
            <select
              value={fields.curriculum}
              onChange={this.onChange('curriculum', e => e.target.value)}
            >
              <option>Select a curriculum</option>
              <option value="nigerian">Nigerian</option>
              <option value="british">British</option>
            </select>
            {this.displayError('curriculum') && (
              <ErrorText>This field is required</ErrorText>
            )}
          </Flex>
          <Flex pb={3} flexDirection="column">
            <label>No of Hours per day</label>
            <select
              value={fields.hours}
              onChange={this.onChange('hours', e => e.target.value)}
            >
              <option>Select an option</option>
              <option value="1">1 hour</option>
              <option value="1.5">1 hour 30 minutes</option>
              <option value="2">2 hours</option>
            </select>
            {this.displayError('hours') && (
              <ErrorText>This field is required</ErrorText>
            )}
          </Flex>
          <Flex flexDirection="column" pb={3}>
            <label>Home address</label>
            <input
              type="text"
              value={fields.address}
              placeholder="12 Jones street"
              onChange={this.onChange('address', e => e.target.value)}
            />
            {this.displayError('address') && (
              <ErrorText>This field is required</ErrorText>
            )}
          </Flex>
          <Flex pb={3}>
            <Flex flexDirection="column" width="100%" mr={2}>
              <label>State</label>
              <input
                type="text"
                value={fields.state}
                placeholder="Lagos"
                onChange={this.onChange('state', e => e.target.value)}
              />
              {this.displayError('state') && (
                <ErrorText>This field is required</ErrorText>
              )}
            </Flex>
            <Flex flexDirection="column" width="100%" ml={2}>
              <label>Vicinity</label>
              <input
                type="text"
                value={fields.vicinity}
                placeholder="Lekki"
                onChange={this.onChange('vicinity', e => e.target.value)}
              />
              {this.displayError('vicinity') && (
                <ErrorText>This field is required</ErrorText>
              )}
            </Flex>
          </Flex>
          <Flex pb={3} flexDirection="column">
            <label>Expectation</label>
            <textarea
              rows={10}
              value={fields.expectation}
              placeholder="I need my son to read fluently. He is age 7 and can hardly read a sentence on his own. So I need someone to help improve his reading."
              onChange={this.onChange('expectation', e => e.target.value)}
            />
            {this.displayError('expectation') && (
              <ErrorText>This field is required</ErrorText>
            )}
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
          <Flex pb={3} flexDirection="column">
            <label for="parent-request">
              <input
                type="checkbox"
                name="parent-request"
                value={fields.is_parent_request}
                onChange={this.onChange(
                  'is_parent_request',
                  e => e.target.value
                )}
              />
              Is parent request
            </label>
          </Flex>
          <Flex pb={3} flexDirection="column">
            <label>Available Days</label>
            <TagsInput tags={fields.days || []} />
          </Flex>
          <Flex pb={3} flexDirection="column">
            <label>Class of Child</label>
            <TagsInput tags={fields.classes || []} />
          </Flex>
          <Flex pb={5} flexDirection="column">
            <label>Request Subjects</label>
            <TagsInput tags={fields.subjects || []} />
          </Flex>
          <Button type="submit">Submit</Button>
        </Flex>
      </form>
    );
  }
}

export default RequestForm;
