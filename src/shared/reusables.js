/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import {
  Box,
  Flex,
  Text,
  Link,
  Heading,
  Image,
  Card,
  Button as DButton
} from "@rebass/emotion";
import React from "react";
import format from "date-fns/format";
import { DialogButton, Button, DialogElement } from "./primitives";
import { FormDrawer, RequestForm } from "./components";
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
  let V = Link;
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
          @media(max-width: 768px){
            flex-direction: column;
          }
        `}
      >
        <Box
          css={css`
            flex: 1;
          `}
        >
          <Text>{leftTop || date}</Text>
          <Text fontSize={5}>{heading}</Text>
          <Text>{subHeading}</Text>
        </Box>
        {children}
        <Flex
          flexDirection="column"
          css={css`
            flex: 0.5;
            align-self: center;
            align-items: center;
            @media(max-width: 768px){
              position: absolute;
              align-self: flex-end;
            }
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
  Component = ListItem,
  ...rest
}) {
  let _keyFunc = withdrawal => {
    return withdrawal[keyIndex];
  };
  let keyFunc = rest.keyFunc || _keyFunc;
  let rows = [];
  let lastCategory = null;
  [...data].sort(orderFunc).forEach((withdrawal, index) => {
    let date = funcGetter(withdrawal, keyValue);
    if (date !== lastCategory) {
      rows.push(<ListGroup name={date} key={date} />);
    }
    rows.push(
      <Component
        key={keyFunc(withdrawal)}
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
  children,
  frozen,
  unFreezeProfile,
  leftSectionChildren,
  overWriteChildren = false
}) => {
  return (
    <Flex>
      <Image src={image} height={100} />
      <Flex
        mb={4}
        pl={3}
        pt={2}
        flexDirection="column"
        css={css`
          flex: 2;
        `}
      >
        <Text mb={1}>{detail[0]}</Text>
        <Heading fontSize={5}>{detail[1]}</Heading>
        <Text mb={1}>{detail[2]}</Text>
        <Text mb={1}>{detail[3]}</Text>
        {leftSectionChildren}
      </Flex>
      {overWriteChildren ? (
        children
      ) : (
        <Flex
          flexDirection="column"
          css={css`
            align-self: ${frozen ? "flex-start" : "center"};
          `}
        >
          {frozen && (
            <DialogButton
              dialogText="Are you sure you want to unfreeze tutor profile"
              confirmAction={unFreezeProfile}
              mb={2}
            >
              Un Freeze Profile
            </DialogButton>
          )}
          {children}
        </Flex>
      )}
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
  heading_footer,
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
        {heading_subtext && <Text fontSize={1}>({heading_subtext})</Text>}
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
  budget,
  tutor,
  status,
  to,
  children,
  summary,
  no_of_students = 1,
  request_type,
  rightBottom,
  rightTop,
  ...rest
}) => {
  return (
    <React.Fragment>
      <BaseListItem
        {...{
          to,
          leftTop: `Slug: ${slug}`,
          rightTop: rightTop || `Status :${status}`,
          rightBottom: (
            <Flex flexDirection="column">
              <Text>
                {request_type === "group"
                  ? `${skill} group lessons`
                  : `Skill: ${skill}`}
              </Text>
              <Text>
                {request_type === "group"
                  ? rightBottom
                  : tutor && `Tutor: ${tutor}`}
              </Text>
            </Flex>
          ),
          heading: full_name,
          heading_subtext: email,
          sub_heading: (
            <React.Fragment>
              <Text>{phone_no && `Phone no: ${phone_no}`}</Text>
              <Text>
                {summary ||
                  `${no_of_students} ${
                    no_of_students > 1 ? `students` : `student`
                  }`}
              </Text>
            </React.Fragment>
          ),
          rightSection: `N ${budget}`,
          children,
          ...rest
        }}
      />
    </React.Fragment>
  );
};
export const GroupLessonListItem = RequestListItem;
const ViewProfile = ({ label, value, link_text = "Hijack and view", to }) => (
  <Text pb={2}>
    <Flex>
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
    </Flex>
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
  onEdit,
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
        {first_session && last_session && (
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
        <DButton
          css={css`
            width: 100%;
          `}
          mt={2}
          onClick={onEdit}
        >
          Edit
        </DButton>
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
  remark,
  ...rest
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
      {...rest}
    />
  );
};

export function SubjectDetailView({
  skill,
  onRetakeTest,
  onStatusChange,
  dialogText = () => ``,
  options = ["Active", "Require Modification", "Denied"]
}) {
  return (
    <Flex flexDirection="column">
      <Flex justifyContent="space-between" pb={2}>
        <Flex flexDirection="column">
          <Text fontSize={5} pb={2}>
            {skill.heading}
          </Text>
          <Flex justifyContent="space-between">
            <Text>{skill.stats.active_bookings} Active bookings</Text>
            <Text>{skill.stats.hours_taught} Hours taught</Text>
            <Text>{skill.location}</Text>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          css={css`
            align-items: center;
          `}
        >
          <Text fontSize={3}>{skill.price}</Text>
          <Text>
            <Link href={skill.link} target="_blank">
              View Skill Profile
            </Link>
          </Text>
        </Flex>
      </Flex>
      <ListGroup name="description" />
      <DetailItem>{skill.description}</DetailItem>
      <ListGroup name="Quiz Result" />
      <DetailItem label="Score">
        <Flex
          css={css`
            align-items: center;
          `}
        >
          <Text pr={3}>{skill.quiz.score}</Text>
          {skill.quiz && !skill.quiz.passed && (
            <DialogButton
              dialogText="Are you sure you want this tutor to retake the test?"
              confirmAction={onRetakeTest}
            >
              {`Retake Test`}
            </DialogButton>
          )}
        </Flex>
      </DetailItem>
      <ListGroup name="Admin Actions" />
      <DetailItem label="Set Status">
        <DialogElement dialogText={dialogText} confirmAction={onStatusChange}>
          {onClick => (
            <select
              onChange={e => {
                onClick(e.target.value);
              }}
              css={css`
                padding-top: 10px;
                padding-bottom: 10px;
              `}
            >
              <option>Select Status</option>
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          )}
        </DialogElement>
      </DetailItem>
    </Flex>
  );
}

export const SessionListItem = ({
  to,
  date,
  order,
  price,
  status,
  remark,
  onEdit,
  no_of_hours
}) => {
  return (
    <BaseListItem
      to={to}
      {...{
        leftTop: `Order: ${order}`,
        heading: price,
        rightSection: onEdit && <Button onClick={onEdit}>Edit Session</Button>,
        sub_heading: `Status: ${status}`,
        rightBottom: `Date: ${getDate(date)}`,
        rightTop: `Status: ${status}`
      }}
    />
  );
};

export const RatingComponent = ({ rating = 5, color }) => {
  const array = Array.from(Array(Math.round(rating)), (x, i) => i + 1);
  return array.map((value, index) => (
    <span style={{ color: color }} key={index.toString()}>
      &#9733;
    </span>
  ));
};
export const RequestStatusSummary = ({
  label,
  amount = 0,
  no = 0,
  label_name = "No of bookings"
}) => {
  return (
    <Card
      fontSize={6}
      fontWeight="bold"
      width={[1, 1, 1 / 2]}
      p={5}
      my={5}
      mx={2}
      bg="#f6f6ff"
      borderRadius={8}
      boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
    >
      <Box>
        <Text fontSize={2}>{label}</Text>
      </Box>
      {amount.toLocaleString()}
      <Text fontSize={3}>
        {label_name}: {no}
      </Text>
    </Card>
  );
};
export function SummaryCardList({ items }) {
  return (
    <Flex>
      {items.map((summaryItem, index) => {
        return (
          <RequestStatusSummary
            key={`${summaryItem.name}-${index}`}
            label_name={summaryItem.count_text}
            label={summaryItem.name}
            amount={summaryItem.amount}
            no={summaryItem.count}
          />
        );
      })}
    </Flex>
  );
}

export function RequestDetailHeader({
  request,
  isOpen = false,
  onClose = () => {},
  openModal = () => {},
  onSubmit = () => {}
}) {
  return (
    <TutorDetailHeader
      overWriteChildren
      detail={[
        request.user.phone,
        <React.Fragment>
          {request.user.full_name}
          <DButton
            fontSize="15px"
            ml={2}
            css={css`
              cursor: pointer;
            `}
          >
            Create user account
          </DButton>
        </React.Fragment>,
        request.user.email,
        <Link target="_blank" target="http://www.google.com">
          http://www.google.com
        </Link>
      ]}
    >
      <Flex
        flexDirection="column"
        css={css`
          flex: 1.5;
          align-self: center;
        `}
      >
        <Flex flexDirection="column">
          <Text pb={2}>
            <strong>Slug:</strong> {request.slug}{" "}
          </Text>
          <Text pb={2}>
            <strong>Request ID:</strong> {request.request_id}{" "}
          </Text>
          <Text>
            <strong>Number of hours:</strong> {request.no_of_hours}{" "}
          </Text>
        </Flex>
      </Flex>
      <Box>
        <Text pb={2} fontSize={5}>
          <strong>Budget:</strong> {request.budget}{" "}
        </Text>
        <Text pb={2}>
          <strong>Per hour rate:</strong> {request.per_hour_rate}{" "}
        </Text>
        <Text fontSize={3} pb={2}>
          <strong>Status:</strong> {request.status}
        </Text>
        <Link onClick={openModal}>Edit Request</Link>
      </Box>
      <FormDrawer isOpen={isOpen} edit={Boolean(request)} onClose={onClose}>
        <RequestForm fields={request} onSubmit={onSubmit} />
      </FormDrawer>
    </TutorDetailHeader>
  );
}
