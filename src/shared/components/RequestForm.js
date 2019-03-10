/**@jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "@rebass/emotion";
import React, { Component } from "react";
import { TagsInput } from ".";
import { Button, Dropdown } from "../primitives";
import { Input, Select, Textarea, Checkbox } from "./form-elements";


const formFields = [
  "first_name",
  "last_name",
  "email",
  "phone",
  "no_of_children",
  "status",
  "no_of_days",
  "gender",
  "how_you_heard",
  "request_type",
  "curriculum",
  "hours",
  "address",
  "state",
  "vicinity",
  "expectation",
  "budget"
];

export class RequestForm extends Component {
  state = {
    fields: this.props.fields || {},
    error: false
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
        [field]: result
      }
    }));
  };
  onSubmit = e => {
    e.preventDefault();
    const { fields } = this.state;
    if (this.isValid()) {
      this.props.onSubmit(fields);
    } else {
      this.setState({
        error: true
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
          input[type="text"],
          input[type="email"],
          input[type="date"],
          input[type="number"],
          input[type="tel"] {
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
            <Input
              value={fields.first_name}
              onChange={this.onChange("first_name", v => v)}
              label="First name"
              placeholder="James"
              isInvalid={this.displayError("first_name")}
            />
            <Input
              placeholder="Harden"
              value={fields.last_name}
              isInvalid={this.displayError("last_name")}
              onChange={this.onChange("last_name", e => e)}
              label="Last name"
            />
          </Flex>
          <Flex pb={3}>
            <Input
              type="email"
              label="Email address"
              placeholder="jamesharden@gmail.com"
              value={fields.email}
              onChange={this.onChange("email", e => e)}
            />
            <Input
              type="tel"
              label="Phone Number"
              placeholder="08078654312"
              value={fields.phone}
              onChange={this.onChange("phone", e => e)}
            />
          </Flex>
          <Select
            options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            value={fields.no_of_children}
            label="Number of students"
            onChange={this.onChange("no_of_children", e => e)}
            isInvalid={this.displayError("no_of_children")}
          />
          <Select
            defaultText="Select Status"
            value={fields.status}
            label="Status"
            onChange={this.onChange("status", e => e)}
            options={[["pending", "Pending"], ["completed", "Completed"]]}
            isInvalid={this.displayError("status")}
          />
          <Select
            label="Days per week"
            value={fields.no_of_days}
            onChange={this.onChange("no_of_days", e => e)}
            defaultText="Select duration"
            options={[1, 2, 3, 4, 5, 6, 7]}
            isInvalid={this.displayError("days")}
          />
          <Select
            label="Gender"
            value={fields.gender}
            onChange={this.onChange("gender", e => e)}
            defaultText="Any"
            options={[["M", "Male"], ["F", "Female"]]}
            isInvalid={this.displayError("gender")}
          />
          <Select
            label="Where you heard"
            value={fields.how_you_heard}
            onChange={this.onChange("how_you_heared", e => e)}
            defaultText="Select an option"
            options={[
              [0, "Facebook"],
              [1, "Search Engine (Google/Yahoo/Bing)"],
              [2, "Friends, Family or Word of Mouth"],
              [3, "Instagram"],
              [4, "Linkedin"],
              [5, "Saw a Flyer"],
              [6, "At an Event"],
              [7, "Spoke with an Agent"],
              [8, "Youtube"],
              [9, "Got an SMS"],
              [10, "Twitter"],
              [11, "Heard on Radio"],
              [12, "Watched on TV"],
              [13, "Nairaland"],
              [14, "Read a Blog Post"],
              [15, "Others"]
            ]}
          />

          <Select
            label="Request Type"
            value={fields.request_type}
            onChange={this.onChange("request_type", e => e)}
            defaultText="Select an option"
            options={[
              ["regular request", "Regular Request"],
              ["group lesson", "Group Lesson"]
            ]}
            isInvalid={this.displayError("request_type")}
          />

          <Select
            label="Curriculum"
            value={fields.curriculum}
            onChange={this.onChange("curriculum", e => e)}
            defaultText="Select an curriculum"
            options={[["nigeiran", "Nigerian"], ["british", "British"]]}
            isInvalid={this.displayError("curriculum")}
          />

          <Select
            label="No of Hours per day"
            value={fields.hours}
            onChange={this.onChange("hours", e => e)}
            defaultText="Select an curriculum"
            options={[
              [1, "1 hour"],
              [1.5, "1 hour 30 minutes"],
              [2, "2 hours"]
            ]}
            isInvalid={this.displayError("hours")}
          />
          <Input
            value={fields.address}
            label="Home address"
            placeholder="12 Jones street"
            onChange={this.onChange("address", e => e)}
            isInvalid={this.displayError("address")}
          />
          <Flex pb={3}>
            <Input
              value={fields.state}
              label="State"
              placeholder="Lagos"
              onChange={this.onChange("state", e => e)}
              isInvalid={this.displayError("state")}
            />
            <Input
              value={fields.vicinity}
              label="Vicinity"
              placeholder="Lekki"
              onChange={this.onChange("vicinity", e => e)}
              isInvalid={this.displayError("vicinity")}
            />
          </Flex>
          <Textarea
            label="Expectation"
            rows={10}
            value={fields.expectation}
            placeholder="I need my son to read fluently. He is age 7 and can hardly read a sentence on his own. So I need someone to help improve his reading."
            onChange={this.onChange("expectation", e => e)}
            isInvalid={this.displayError("expectation")}
          />
          <Input
            type="number"
            label="Budget"
            value={fields.budget}
            placeholder="25000"
            onChange={this.onChange("budget", e => e)}
            isInvalid={this.displayError("budget")}
          />
          <Checkbox
            label="Is parent request"
            value={fields.is_parent_request}
            name="parent-request"
            onChange={this.onChange("is_parent_request", e => e)}
          />
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
