/**@jsx jsx */
import React, { Component } from "react";
import { css, jsx } from "@emotion/core";
import { Flex, Box } from "@rebass/emotion";
import * as yup from "yup";
import { TagsInput } from ".";
import { Button } from "../primitives";
import { Form } from "./FormComponent";
import { formStyle } from "../design-system/global";
import Alert from "../primitives/Alert";

const GroupRequestFormValidation = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email()
    .required("Email is required"),
  budget: yup.string().required("Budget is required")
});

const formData = (tutors, skills) => [
  {
    name: "slug",
    label: "Slug",
    placeholder: "Slug"
  },
  {
    name: "first_name",
    label: "First name",
    placeholder: "James"
  },
  {
    name: "last_name",
    label: "Last name",
    placeholder: "Harden"
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    placeholder: "james.harden@gmail.com"
  },
  {
    type: "tel",
    name: "number",
    label: "Phone number",
    placeholder: "08078654312"
  },
  {
    kind: "select",
    label: "Skill",
    defaultText: "Skill",
    options: skills,
    name: "skill",
    mr: 2
  },
  {
    kind: "select",
    label: "Status",
    defaultText: "Status",
    options: [
      ["pending", "Pending"],
      ["completed", "Completed"],
      ["payed", "Payed"]
    ],
    name: "status"
  },
  {
    kind: "select",
    label: "Tutor",
    defaultText: "Any",
    options: tutors,
    name: "tutor",
    pb: 0
  },
  {
    kind: "select",
    label: "Where you heard",
    defaultText: "Select an option",
    options: [
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
    ],
    name: "how_you_heard",
    mr: 2
  },
  {
    name: "state",
    label: "State",
    placeholder: "Lagos"
  },
  {
    name: "vicinity",
    label: "Vicinity",
    placeholder: "Lekki"
  },
  {
    kind: "textarea",
    name: "expectation",
    label: "Expectation",
    placeholder:
      "I need my son to read fluently. He is age 7 and can hardly read a sentence on his own. So I need someone to help improve his reading."
  },
  {
    type: "number",
    name: "budget",
    label: "Budget",
    placeholder: "25000"
  },
  {
    name: "schedule",
    label: "Schedule",
    placeholder: "March Standard Class"
  }
];

export const GroupRequestForm = ({
  onSubmit,
  initialValues,
  tutors,
  skills
}) => {
  let [isLoading, setLoading] = React.useState(false);
  let [error, setError] = React.useState(false);

  const saveRequest = data => {
    setLoading(true);
    setError(false);
    onSubmit({ ...data, request_subjects: [data.skill] }).catch(error => {
      setLoading(false);
      setError(true);
    });
  };
  return (
    <Form
      validationSchema={GroupRequestFormValidation}
      fields={formData(tutors, skills)}
      onSubmit={values => saveRequest(values)}
      data={initialValues}
      render={(fields, button) => {
        return (
          <div
            css={css`
              ${formStyle}
            `}
          >
            {error && (
              <Alert status="error">
                There was an error processing the form
              </Alert>
            )}
            <Flex flexDirection="column">
              {initialValues.slug && <Box pb={3}>{fields.slug}</Box>}
              <Flex pb={3}>
                {fields.first_name}
                {fields.last_name}
              </Flex>
              <Flex pb={3}>
                {fields.email}
                {fields.number}
              </Flex>
              <Flex pb={3}>
                {fields.state}
                {fields.vicinity}
              </Flex>
              <Flex>
                {fields.skill}
                {fields.status}
              </Flex>
              <Flex>
                {fields.how_you_heard}
                {fields.tutor}
              </Flex>
              <Flex pb={3}>
                {fields.budget}
                {fields.schedule}
              </Flex>
              <Box pb={3}>{fields.expectation}</Box>
              {React.cloneElement(button, { disabled: isLoading })}
              {/* <Button type="submit">Submit</Button> */}
            </Flex>
          </div>
        );
      }}
    />
  );
};

GroupRequestForm.defaultProps = {
  onSubmit: values => console.log(values),
  tutors: [
    ["Chidiebere", "chidiebere@gmail.com"],
    ["Oluwawemimo", "oluwawemimo34@gmail.com"]
  ],
  skills: [["IELTS", "IELTS"]]
};

export default GroupRequestForm;
