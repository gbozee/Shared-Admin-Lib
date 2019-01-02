/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Box, Flex, Button, Text, Link,Heading } from "@rebass/emotion";
import React from "react";
import format from "date-fns/format";

export function getDate(date, short = false) {
  let dd = new Date(date);
  return format(dd, short ? "MMM D, YYYY" : "MMMM D, YYYY");
}
export const ListGroup = ({ name }) => {
  return (
    <Flex width={1} justifyContent="center" bg="#f0f0f0" py={2}>
      {name}
    </Flex>
  );
};
export const AsLink = ({ to, onClick, children, ...rest }) => {
  let WLink = rest.Link || Link;

  return Boolean(to) || Boolean(onClick) ? (
    <WLink
      to={to}
      onClick={onClick}
      href={to}
      css={css`
        text-decoration: none;
        color: #000;
        :hover {
          cursor: pointer;
        }
      `}
    >
      {children}
    </WLink>
  ) : (
    children
  );
};
export const ListItem = ({
  to,
  heading,
  subHeading,
  rightSection,
  onClick,
  ...rest
}) => {
  return (
    <AsLink to={to} onClick={onClick} {...rest}>
      <Flex
        py={3}
        px={2}
        width={1}
        justifyContent="space-between"
        css={css`
          border-bottom: 1px solid black;
        `}
      >
        <Box>
          <Text fontSize={5}>{heading}</Text>
          <Text>{subHeading}</Text>
        </Box>
        <Flex
          flexDirection="column"
          css={css`
            align-self: center;
          `}
        >
          {rightSection}
        </Flex>
      </Flex>
    </AsLink>
  );
};

export const DetailItem = ({ label, children }) => {
  return (
    <Flex py={2} justifyContent="space-between">
      <Text fontSize={3}>{label}</Text>
      <Text fontSize={3}>{children}</Text>
    </Flex>
  );
};

export function getTime(date) {
  let dd = new Date(date);
  return format(dd, "h:mm a");
}

export const SectionListPage = ({ data,keyValue="date",keyIndex='order',LinkComponent=Link, callback = () => {},Component=ListItem }) => {
  let rows = [];
  let lastCategory = null;
  [...data]
    .sort((a, b) => new Date(b[keyValue]).getTime() - new Date(a[keyValue]).getTime())
    .forEach((withdrawal, index) => {
      let date = getDate(withdrawal[keyValue]);
      if (date !== lastCategory) {
        rows.push(<ListGroup name={date} key={date} />);
      }
      rows.push(<Component key={withdrawal[keyIndex]} {...callback(withdrawal)} Link={LinkComponent} />);
      lastCategory = date;
    });
  return rows;
};

export const DetailHeader = ({ heading, subHeading, children }) => {
  return (
    <Flex
      mb={4}
      flexDirection="column"
      css={css`
        align-items: center;
      `}
    >
      <Heading fontSize={5}>{heading}</Heading>
      <Text>{subHeading}</Text>
      {children}
    </Flex>
  );
};

export const PVerificationListItem = ({
  heading,
  subHeading,
  date,
  rightSection,
  verified = false,
  to,
  ...rest
}) => {
  return (
    <AsLink to={to} {...rest}>
      <Flex
        py={3}
        px={2}
        width={1}
        justifyContent="space-between"
        css={css`
          border-bottom: 1px solid black;
        `}
      >
        <Box>
          <Text>{date}</Text>
          <Text fontSize={5}>{heading}</Text>
          <Text>{subHeading}</Text>
        </Box>
        <Flex
          flexDirection="column"
          css={css`
            align-self: center;
            align-items: center;
          `}
        >
          <Box>{rightSection}</Box>
          {verified && <Text>✔</Text>}
        </Flex>
      </Flex>
    </AsLink>
  );
};


