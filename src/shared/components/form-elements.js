/**@jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Flex, Text } from "@rebass/emotion";
import React, { Component } from "react";
import { Dropdown } from "../primitives";

const ErrorText = styled(Text)`
  color: red;
  font-size: 12px;
`;

export const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  isInvalid,
  errorMessage = "This field is required",
  ...rest
}) => {
  return (
    <Flex flexDirection="column" width="100%" mr={2} {...rest}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        css={css`
          padding-top: 10px;
          padding-bottom: 10px;
        `}
        {...rest}
        type={type}
        name={name}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {isInvalid && <ErrorText>{errorMessage}</ErrorText>}
    </Flex>
  );
};

export const Select = ({
  options = [],
  onChange,
  isInvalid,
  errorMessage = "This field is required",
  value,
  name,
  label,
  defaultText = "Select",
  onBlur,
  ...rest
}) => {
  return (
    <Flex pb={rest.pb || 3} flexDirection="column" width="100%" {...rest}>
      {label && <label htmlFor={name}>{label}</label>}
      <Dropdown
        value={value}
        name={name}
        id={name}
        css={css`
          padding-top: 10px;
          padding-bottom: 10px;
        `}
        options={[["", defaultText]].concat(options)}
        onChange={onChange}
        onBlur={onBlur}
      />

      {isInvalid && <ErrorText>{errorMessage}</ErrorText>}
    </Flex>
  );
};

export const Checkbox = ({ name, label, value, onChange, onBlur }) => {
  return (
    <Flex pb={3}>
      <label>
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={value}
          onBlur
          onChange={e => onChange(e.target.checked)}
        />
        {label}
      </label>
    </Flex>
  );
};
export const Textarea = ({
  label,
  value,
  onChange,
  isInvalid,
  errorMessage = "This field is required",
  name,
  ...rest
}) => {
  return (
    <Flex pb={3} flexDirection="column">
      {label && <label>{label}</label>}
      <textarea
        value={value}
        {...rest}
        onChange={e => onChange(e.target.value)}
      />
      {isInvalid && <ErrorText>{errorMessage}</ErrorText>}
    </Flex>
  );
};

Textarea.defaultProps = {
  rows: 8
}
