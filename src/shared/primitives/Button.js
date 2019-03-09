/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import styled from "@emotion/styled";
import { Box, Flex, Button as EButton, Text, Link } from "@rebass/emotion";
import Application from "../application";

// export const EmptyButton = styled.button`
//   transition: all 0.2s cubic-bezier(0.4, 0, 0.23, 1);
//   background: none;
//   align-items: center;
//   justify-content: center;
//   display: flex;
//   border: none;
//   margin: 0;
//   padding: 0;
//   cursor: pointer;
//   width: ${props => (props.isFullWidth ? "100%" : "auto")};
// `;
export const EmptyButton = props => (
  <Application>
    <button
      css={theme => css`
        font-family: ${theme.fonts.font_family};
        font-weight: ${theme.fonts.font_weight.medium};
        transition: all 0.2s cubic-bezier(0.4, 0, 0.23, 1);
        border-radius: ${theme.borders.border_radius.default};
        background: none;
        align-items: center;
        justify-content: center;
        display: flex;
        border: none;
        margin: 0;
        padding: 0;
        cursor: pointer;
        width: ${props => (props.isFullWidth ? "100%" : "auto")};

        ${theme.borders.focus_states.button};
      `}
      {...props}
    />
  </Application>
);

export const Button = ({ ...rest }) => {
  return (
    <EButton
      py={3}
      css={css`
        :hover {
          cursor: pointer;
        }
        :disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}
      {...rest}
    />
  );
};
