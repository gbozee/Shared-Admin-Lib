/** @jsx jsx */

import React from "react";
import { css, jsx } from "@emotion/core";
import { Box, Flex, Text } from "@rebass/emotion";
import { storiesOf } from "@storybook/react";
import { Form, FormProvider } from "../src/shared/components/FormComponent";
import * as yup from "yup";
const TextArea = props => <textarea {...props} />;
const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Email is required ")
});
let data = [
  { name: "email", type: "email", label: "Email" },
  { name: "first_name", label: "First name" },
  { name: "last_name", label: "Last name" },
  {
    name: "gender",
    options: ["Male", "Female"],
    type: "radio",
    label: "Gender"
  },
  {
    name: "age_range",
    options: [["", "Select Age"], ["2", "Two year old"], ["3", "3 Year hold"]]
  }
];
const Wrapper = ({ children }) => (
  <Box
    css={css`
      .simple-form {
        flex-direction: column;
      }
    `}
  >
    {children}{" "}
  </Box>
);
storiesOf("Forms", module)
  .add("Default Rendering", () => (
    <Wrapper>
      <Form
        fields={data}
        validationSchema={schema}
        data={{}}
        onSubmit={result => {
          console.log(result);
        }}
      />
    </Wrapper>
  ))
  .add("With Existing Values", () => (
    <Wrapper>
      <Form
        fields={data}
        data={{ email: "gbozee@example.com" }}
        validationSchema={schema}
        onSubmit={result => {
          console.log(result);
        }}
      />
    </Wrapper>
  ))
  .add("Custom Layout", () => {
    return (
      <Wrapper>
        <Form
          fields={data}
          validationSchema={schema}
          onSubmit={result => {
            console.log(result);
          }}
          render={(fields, button) => (
            <Flex flexDirection="column">
              <Flex>
                {fields.first_name}
                {fields.last_name}
              </Flex>
              <Box>{fields.email}</Box>
              <Flex>{fields.gender}</Flex>
              <Flex>{fields.age_range}</Flex>
              <Flex>{button}</Flex>
            </Flex>
          )}
        />
      </Wrapper>
    );
  })
  .add("Custom Elements", () => {
    return (
      <Wrapper>
        <Form
          validationSchema={schema}
          fields={[...data, { name: "expectaton", component: TextArea }]}
          onSubmit={result => {
            console.log(result);
          }}
        />
      </Wrapper>
    );
  })
  .add("With Error Messages", () => {
    const errors = {
      first_name: "This field is required",
      email: {
        empty: "This field is required",
        invalid: "This email is invalid"
      }
    };
    return (
      <Wrapper>
        <Form
          fields={data}
          validationSchema={schema}
          error_messages={errors}
          onSubmit={result => console.log(result)}
        />
        /
      </Wrapper>
    );
  })
  .add("Custom Components", () => {
    const formElements = {
      text: TextArea
    };
    return (
      <Wrapper>
        <FormProvider formElements={formElements}>
          <Form fields={data} onSubmit={result => console.log(result)} />
        </FormProvider>
      </Wrapper>
    );
  });
