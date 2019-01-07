/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Box, Flex, Button, Text, Link, Heading, Image } from "@rebass/emotion";
import React from "react";
import format from "date-fns/format";
import { DialogButton } from "./primitives";
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
  date,
  rightSection,
  onClick,
  verified = false,
  leftTop,
  gender,
  rightTop,
  children,
  rightBottom = <Text>✔</Text>,
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
          <Text>{leftTop || date}</Text>
          <Text fontSize={5}>{heading}</Text>
          <Text>{subHeading}</Text>
        </Box>
        {children}
        <Flex
          flexDirection="column"
          css={css`
            align-self: center;
            align-items: center;
          `}
        >
          <Text>{rightTop || gender}</Text>
          <Box>{rightSection}</Box>
          {verified && rightBottom}
        </Flex>
      </Flex>
    </AsLink>
  );
};

export const DetailItem = ({ label, children, flexDirection }) => {
  return (
    <Flex py={2} justifyContent="space-between" flexDirection={flexDirection}>
      <Text fontSize={3}>{label}</Text>
      <Text fontSize={3}>{children}</Text>
    </Flex>
  );
};

export function getTime(date) {
  let dd = new Date(date);
  return format(dd, "h:mm a");
}

export const SectionListPage = ({
  data,
  keyValue = "date",
  keyIndex = "order",
  LinkComponent = Link,
  callback = () => {},
  Component = ListItem
}) => {
  let rows = [];
  let lastCategory = null;
  [...data]
    .sort(
      (a, b) =>
        new Date(b[keyValue]).getTime() - new Date(a[keyValue]).getTime()
    )
    .forEach((withdrawal, index) => {
      let date = getDate(withdrawal[keyValue]);
      if (date !== lastCategory) {
        rows.push(<ListGroup name={date} key={date} />);
      }
      rows.push(
        <Component
          key={withdrawal[keyIndex]}
          {...callback(withdrawal)}
          Link={LinkComponent}
        />
      );
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

export const TutorDetailHeader = ({
  image = "https://via.placeholder.com/100",
  detail,
  children
}) => {
  return (
    <Flex>
      <Image src={image} height={100} />
      <Flex
        mb={4}
        flexDirection="column"
        css={css`
          flex: 2;
        `}
      >
        <Text mb={1}>{detail[0]}</Text>
        <Heading fontSize={5}>{detail[1]}</Heading>
        <Text mb={1}>{detail[2]}</Text>
        <Text mb={1}>{detail[3]}</Text>
      </Flex>
      <Flex
        flexDirection="column"
        css={css`
          align-self: center;
        `}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export const VerificationItem = ({ label, children, buttons = [] }) => {
  return (
    <Flex py={3} justifyContent="space-between">
      <Flex flexDirection="column">
        {label && (
          <Text fontWeight="bold" pb={3}>
            {label}
          </Text>
        )}
        {children}
      </Flex>
      <Flex>
        {buttons.map((button, index) => (
          <DialogButton mr={index === 0 ? 3 : 0} {...button} />
        ))}
      </Flex>
    </Flex>
  );
};

export const RequestListItem = ({
  slug,
  full_name,
  email,
  phone_no,
  skill,
  tutor,
  status,
  to,
  children,
  ...rest
}) => {
  return (
    <ListItem
      to={to}
      leftTop={`Slug: ${slug}`}
      rightTop={`Status: ${status}`}
      verified={true}
      rightBottom={
        tutor && (
          <Text
            css={css`
              font-size: 15px;
            `}
          >
            Tutor: {tutor}
          </Text>
        )
      }
      heading={
        <Flex
          justifyContent="space-between"
          css={css`
            align-items: center;
            width: 105%;
          `}
        >
          <Heading>{full_name}</Heading>
          <Text fontSize={1}>({email})</Text>
        </Flex>
      }
      subHeading={phone_no && `Phone no: ${phone_no}`}
      rightSection={
        <Text
          css={css`
            font-weight: bold;
          `}
        >
          {skill}
        </Text>
      }
      {...rest}
    >
      {children}
    </ListItem>
  );
};
