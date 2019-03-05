/** @jsx jsx */

import React from "react";
import { css, jsx } from "@emotion/core";
import { Box, Flex, Text } from "@rebass/emotion";
import { storiesOf } from "@storybook/react";
import { Form } from "./Form";
const TextArea = props => <textarea {...props} />;
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
storiesOf("Forms", module)
  .add("Default Rendering", () => (
    <Box
      css={css`
        .simple-form {
          flex-direction: column;
        }
      `}
    >
      <Form
        fields={data}
        data={{}}
        onSubmit={result => {
          console.log(result);
        }}
      />
    </Box>
  ))
  .add("With Existing Values", () => (
    <Box
      css={css`
        .simple-form {
          flex-direction: column;
        }
      `}
    >
      <Form
        fields={data}
        data={{ email: "gbozee@example.com" }}
        onSubmit={result => {
          console.log(result);
        }}
      />
    </Box>
  ))
  .add("Custom Layout", () => {
    return (
      <Box
        css={css`
          .simple-form {
            flex-direction: column;
          }
        `}
      >
        <Form
          fields={data}
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
      </Box>
    );
  })
  .add("Custom Elements", () => {
    return (
      <Box
        css={css`
          .simple-form {
            flex-direction: column;
          }
        `}
      >
        <Form
          fields={[...data, { name: "expectaton", component: TextArea }]}
          onSubmit={result => {
            console.log(result);
          }}
        />
      </Box>
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
      <Box
        css={css`
          .simple-form {
            flex-direction: column;
          }
        `}
      >
        <Form
          fields={data}
          error_messages={errors}
          onSubmit={result => console.log(result)}
        />
        /
      </Box>
    );
  })
  .add("Custom Components", () => {
    const formElements = {
      input: TextArea
    };
    return (
      <Box
        css={css`
          .simple-form {
            flex-direction: column;
          }
        `}
      >
        <FormProvider formElements={formElements}>
          <Form fields={data} onSubmit={result => console.log(result)} />
        </FormProvider>
      </Box>
    );
  });
