function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Box, Flex, Card, Text } from "@rebass/emotion";
import { Button } from "./primitives";
import React from "react";
export const Input = ({
  label,
  type = "text",
  value,
  onChange,
  isValid,
  ...rest
}) => {
  return jsx(Flex, {
    flexDirection: "column",
    py: 3,
    css: css`
        label {
          padding-bottom: 8px;
          font-weight: bold;
          text-transform: capitalize;
        }
        input {
          border-color: ${isValid ? "" : "red"};
          line-height: 24px;
          height: 24px;
          padding: 4px;
        }
      `
  }, jsx("label", {
    htmlFor: rest.name
  }, label), jsx("input", {
    type,
    value,
    onChange,
    ...rest
  }));
};
export class LoginPage extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      fields: {
        email: "",
        password: ""
      },
      loading: false,
      toggleError: false,
      errors: {}
    });

    _defineProperty(this, "onChange", field => {
      return e => {
        this.setState({
          fields: { ...this.state.fields,
            [field]: e.target.value
          }
        });
      };
    });

    _defineProperty(this, "isValid", (toggleError, field) => {
      let {
        fields,
        errors
      } = this.state;
      return toggleError ? Boolean(fields[field]) && Boolean(errors[field]) === false : true;
    });

    _defineProperty(this, "setDefaultErrors", fields => {
      let errors = {};

      if (!Boolean(fields.email)) {
        errors.email = "The email field is required";
      }

      if (!Boolean(fields.password)) {
        errors.password = "The  password field is required";
      }

      this.setState({
        toggleError: true,
        errors
      });
    });

    _defineProperty(this, "onSubmit", e => {
      let {
        fields
      } = this.state;
      let {
        dispatch,
        actions
      } = this.context;
      e.preventDefault();
      this.setState({
        errors: {}
      });
      let isValid = Object.keys(fields).every(field => this.isValid(true, field));

      if (isValid) {
        this.setState({
          loading: true
        });
        dispatch({
          type: actions.LOGIN_USER,
          value: fields
        }).then(data => {
          this.props.toNextPage();
        }).catch(errors => {
          console.log(errors);
          this.setState({
            toggleError: true,
            loading: false,
            errors
          });
        });
      } else {
        this.setDefaultErrors(fields);
      }
    });
  }

  render() {
    let {
      fields
    } = this.state;
    return jsx(Box, {
      mx: "auto",
      mt: 6,
      width: 1 / 3
    }, jsx("form", {
      onSubmit: this.onSubmit
    }, Object.keys(this.state.errors).length > 0 ? jsx(Card, null, Object.keys(this.state.errors).map(error => jsx(Text, null, this.state.errors[error]))) : null, jsx(Input, {
      label: "email",
      value: fields.email,
      type: "email",
      onChange: this.onChange("email"),
      isValid: this.isValid(this.state.toggleError, "email")
    }), jsx(Input, {
      label: "password",
      value: fields.password,
      type: "password",
      onChange: this.onChange("password"),
      isValid: this.isValid(this.state.toggleError, "password")
    }), jsx(Button, {
      disabled: this.state.loading,
      width: 1,
      type: "submit"
    }, "Login")));
  }

}

_defineProperty(LoginPage, "contextType", DataContext);

export default LoginPage;