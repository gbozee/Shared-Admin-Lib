function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Box, Flex, Button, Text } from "@rebass/emotion";
import React from "react";
import { Input } from "./LoginPage";

class FromTo extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      from: "",
      to: ""
    });

    _defineProperty(this, "onChange", key => {
      return e => {
        this.setState({
          [key]: e.target.value
        }, () => {
          this.props.onChange(this.state);
        });
      };
    });
  }

  render() {
    return jsx(Flex, null, jsx(Input, {
      label: "From",
      type: "date",
      name: "from",
      isValid: true,
      value: this.state.from,
      onChange: this.onChange("from")
    }), jsx(Input, {
      value: this.state.to,
      label: "To",
      type: "date",
      name: "to",
      isValid: true,
      onChange: this.onChange("to")
    }));
  }

}

export const DateFilter = ({
  onChange,
  onSearchChange,
  displayDate = true,
  onKeyDown = () => {},
  onFilterChange = () => {},
  filterOptions = [],
  selection,
  placeholder = "Search either email or order"
}) => {
  return jsx(Flex, {
    justifyContent: "space-between"
  }, onSearchChange ? jsx(Box, {
    w: 1,
    pr: 4,
    css: css`
            flex: 1;
            align-self: flex-end;
          `
  }, jsx(Input, {
    onChange: onSearchChange,
    onKeyDown: onKeyDown,
    isValid: true,
    placeholder: placeholder
  })) : null, onChange ? jsx(Flex, {
    flexDirection: "column"
  }, jsx(FromTo, {
    onChange: onChange
  })) : null, filterOptions.length > 0 ? jsx("select", {
    css: css`
            height: 36px;
            align-self: flex-end;
            margin-bottom: 16px;
            margin-left: 20px;
          `,
    value: selection,
    onChange: onFilterChange
  }, filterOptions.map(option => jsx("option", {
    key: option.label,
    value: option.value
  }, option.label))) : null);
};