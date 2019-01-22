/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import styled from "@emotion/styled";
import { Box, Flex, Button as EButton, Text, Link } from "@rebass/emotion";

export const EmptyButton = styled.button`
  transition: all 0.2s cubic-bezier(0.4, 0, 0.23, 1);
  background: none;
  align-items: center;
  justify-content: center;
  display: flex;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
  width: ${props => (props.isFullWidth ? "100%" : "auto")};
`;

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
