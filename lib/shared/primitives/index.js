function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Box, Flex, Button as EButton, Text, Link } from "@rebass/emotion";
import React from "react";
export { DialogButton } from "./Modal";
export const Button = ({ ...rest
}) => {
  return jsx(EButton, _extends({
    py: 3,
    css: css`
        :hover {
          cursor: pointer;
        }
        :disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `
  }, rest));
};