/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Icon } from "./Icon";
import { CloseButton, Button } from "./Button";
import { Flex, Box, Text } from "@rebass/emotion";

const alertOptions = {
  success: {
    color: "supported_color.green.ui_02",
    icon: "check-01"
  },
  error: {
    color: "supported_color.red.ui_01",
    icon: "cancel"
  },
  warning: {
    color: "supported_color.orange.ui_01",
    icon: "error"
  },
  info: {
    color: "supported_color.blue.lighter",
    icon: "info"
  }
};

const StyledAlert = styled(Flex)(props => ({
  position: "relative",
  width: "100%",
  borderRadius: props.isRound ? 4 : 0
}));

const AlertButton = styled(Button)`
  box-shadow: none;
  background: none;
  flex: 0 0 auto;
  opacity: 0.8;
  font-size: 95%;
  padding: 0 8px;
  line-height: 24px;
  height: 24px;

  &:hover {
    opacity: 1;
    background-color: hsla(0, 0%, 0%, 0.05);
  }

  &:focus {
    box-shadow: none;
  }
`;

const Alert = ({
  status,
  title,
  isRound,
  children,
  className,
  isClosable,
  onClose,
  justifyContent,
  marginBottom,
  marginTop,
  action,
  ...rest
}) => {
  return (
    <StyledAlert
      role="alert"
      bg={alertOptions[status].color}
      p="12px 16px"
      className={`Chakra-Alert Alert ${className}`}
      mt={marginTop}
      mb={marginBottom}
      {...{
        status,
        isRound,
        justifyContent,
        ...rest
      }}
    >
      {status && (
        <Box as="span" flex="0 0 auto" mr="16px">
          <Icon name={alertOptions[status].icon} size={20} />
        </Box>
      )}
      <Box flex={justifyContent !== "center" ? "1" : "0 0 auto"}>
        {title && <Text fontWeight="medium">{title}</Text>}
        <Text>{children}</Text>
      </Box>
      {action && (
        <AlertButton size="small" onClick={action.onClick}>
          {action.label}
        </AlertButton>
      )}
      {isClosable && (
        <CloseButton size="24px" iconSize="18px" onClick={onClose} />
      )}
    </StyledAlert>
  );
};

Alert.defaultProps = {
  children: "This is the Alert body",
  isRound: true,
  status: "info"
};

export default Alert;
