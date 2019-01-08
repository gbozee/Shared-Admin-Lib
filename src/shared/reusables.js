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

export function SectionListPage({
  data,
  keyValue = "date",
  orderFunc = (a, b) =>
    new Date(b[keyValue]).getTime() - new Date(a[keyValue]).getTime(),
  keyIndex = "order",
  funcGetter = (item, keyValue) => getDate(item[keyValue]),
  LinkComponent = Link,
  callback = () => {},
  Component = ListItem
}) {
  let rows = [];
  let lastCategory = null;
  [...data].sort(orderFunc).forEach((withdrawal, index) => {
    let date = funcGetter(withdrawal, keyValue);
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
}

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
const BaseListItem = ({
  to,
  leftTop,
  rightTop,
  rightBottom,
  heading,
  heading_subtext,
  sub_heading,
  rightSection,
  children,
  ...rest
}) => (
  <ListItem
    to={to}
    leftTop={leftTop}
    rightTop={rightTop}
    verified={true}
    rightBottom={
      rightBottom && (
        <Text
          css={css`
            font-size: 15px;
          `}
        >
          {rightBottom}
        </Text>
      )
    }
    heading={
      <Flex
        justifyContent="flex-start"
        css={css`
          align-items: center;
        `}
      >
        <Heading pr={2}>{heading}</Heading>
        <Text fontSize={1}>({heading_subtext})</Text>
      </Flex>
    }
    subHeading={sub_heading}
    rightSection={
      <Text
        fontSize="20px"
        css={css`
          font-weight: bold;
        `}
      >
        {rightSection}
      </Text>
    }
    {...rest}
  >
    {children}
  </ListItem>
);
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
    <React.Fragment>
      <BaseListItem
        {...{
          to,
          leftTop: `Slug: ${slug}`,
          rightTop: `Status :${status}`,
          rightBottom: `Tutor: ${tutor}`,
          heading: full_name,
          heading_subtext: email,
          sub_heading: phone_no && `Phone no: ${phone_no}`,
          rightSection: skill,
          children,
          ...rest
        }}
      />
    </React.Fragment>
  );
};
const ViewProfile = ({ label, value, link_text = "Hijack and view", to }) => (
  <Text pb={2}>
    <strong>{label}:</strong> {value}
    {to && (
      <Link
        target="_blank"
        href={to}
        css={css`
          padding-left: 10px;
        `}
      >
        {link_text}
      </Link>
    )}
  </Text>
);
export const BookingDetailHeader = ({
  skill_name,
  tutor,
  order,
  user,
  total_price,
  options = [20, 30, 40, 50, 60, 70, 75, 80, 85],
  percentage_split,
  first_session,
  status,
  last_session,
  hijack_client_link,
  hijack_tutor_link,
  onSplitChange = () => {}
}) => {
  return (
    <Flex justifyContent="space-between">
      <Flex flexDirection="column">
        <Heading pb={3}>
          {skill_name} Lessons with {tutor.full_name}({tutor.email})
        </Heading>
        <ViewProfile label="Order" value={order} />
        <ViewProfile
          label="Client"
          value={`${user.full_name} (${user.email})`}
          to={hijack_client_link}
        />
        <ViewProfile
          label="Tutor"
          value={`${tutor.full_name} (${tutor.email})`}
          to={hijack_tutor_link}
        />
        {first_session &&
          last_session && (
            <Text pb={2}>
              <strong>Duration:</strong>{" "}
              {getDuration(first_session, last_session)}
            </Text>
          )}
      </Flex>
      <Flex
        flexDirection="column"
        css={css`
          align-items: flex-start;
        `}
      >
        <Text pb={2} fontSize="20px">
          Budget:{" "}
          <strong>
            {total_price}/{(total_price * percentage_split) / 100}
          </strong>
        </Text>
        <Text pb={2}>
          Percentage Split:
          <select value={percentage_split} onChange={onSplitChange}>
            {options.map(option => (
              <option key={option} value={option}>
                {option}%
              </option>
            ))}
          </select>
        </Text>
        <Text>
          <strong>Status:</strong> {status}
        </Text>
      </Flex>
    </Flex>
  );
};
function getDuration(first_session, last_session, time = true, short = false) {
  if (first_session && last_session) {
    return `${getDate(first_session, short)} ${
      time ? getTime(first_session) : ""
    } - ${getDate(last_session, short)} ${time ? getTime(first_session) : ""}`;
  }
}
export const BookingListItem = ({
  order,
  user,
  tutor,
  total_price,
  status,
  to,
  skill_name,
  first_session,
  last_session,
  remark
}) => {
  return (
    <BaseListItem
      to={to}
      {...{
        leftTop: `Order: ${order} / Skill: ${skill_name}`,
        heading: user.full_name,
        heading_subtext: user.email,
        sub_heading: `Tutor: ${tutor.full_name} (${tutor.email})`,
        rightSection: total_price,
        rightBottom: `Duration: ${getDuration(
          first_session,
          last_session,
          false,
          true
        )}`,
        rightTop: `Status: ${status}`,
        created: "2018-10-12 14:10:33",
        modified: "2018-10-12 14:10:33"
      }}
      children={remark}
    />
  );
};

export function SubjectDetailView({
  heading,
  description,
  price,
  quiz,
  link,
  status,
  location,
  stats,
  skill
}) {
  return (
    <Flex flexDirection="column">
      <Flex justifyContent="space-between" pb={2}>
        <Flex flexDirection="column">
          <Text fontSize={3} pb={2}>
            {heading}
          </Text>
          <Flex justifyContent="space-between">
            <Text>{stats.active_bookings} Active bookings</Text>
            <Text>{stats.hours_taught} Hours taught</Text>
            <Text>{location}</Text>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          css={css`
            align-items: center;
          `}
        >
          <Text fontSize={3}>{price}</Text>
          <Text>
            <Link href={link} target="_blank">
              View Skill Profile
            </Link>
          </Text>
        </Flex>
      </Flex>
      <ListGroup name="description" />
      <DetailItem>{description}</DetailItem>
      <ListGroup name="Quiz Result" />
      <DetailItem label="Score">
        <Flex
          css={css`
            align-items: center;
          `}
        >
          <Text pr={3}>{quiz.score}</Text>
          {quiz.pass_mark > quiz.score && <Button>Retake Test</Button>}
        </Flex>
      </DetailItem>
      <ListGroup name="Admin Actions" />
      <DetailItem label="Set Status">
        <select
          css={css`
            padding-top: 10px;
            padding-bottom: 10px;
          `}
        >
          <option>Select Status</option>
          {["Active", "Require Modification", "Denied"].map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </DetailItem>
      <DetailItem label="Freeze Subject">
        <Button>Freeze {skill.name}</Button>
      </DetailItem>
    </Flex>
  );
}
