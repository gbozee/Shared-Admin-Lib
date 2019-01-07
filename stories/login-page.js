/** @jsx jsx */

import React from "react";
import { css, jsx } from "@emotion/core";
import { Box, Flex, Text, Link, Heading, Image } from "@rebass/emotion";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import LoginPage from "../src/shared/LoginPage";
import {
  ListItem,
  ListGroup,
  DetailHeader,
  SectionListPage,
  DetailItem,
  PVerificationListItem,
  TutorDetailHeader,
  VerificationItem,
  RequestListItem
} from "../src/shared/reusables";
import { DateFilter } from "../src/shared/DateFilter";
import {
  SpinnerContainer,
  HomePageSpinner
} from "../src/shared/primitives/Spinner";
import { DialogButton, Button } from "../src/shared/primitives";
import DataProvider, {
  ProtectedRoute,
  DataContext
} from "../src/shared/DataProvider";
import { Dialog, ModalButton } from "../src/shared/primitives/Modal";

storiesOf("Pages", module).add("Login Page", () => (
  <LoginPage
    login={() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // resolve();
          reject({ data: "The credentials is invalid" });
        }, 2000);
      });
    }}
    toNextPage={() => {}}
  />
));

storiesOf("Components", module)
  .add("ListItem", () => (
    <React.Fragment>
      <ListItem
        to="http:/www.google.com"
        heading="N10,000"
        subHeading="james@example.com"
        rightSection="10:00 am"
      />
      <ListItem
        to="http:/www.google.com"
        date="Age 23"
        gender="M"
        verified={true}
        heading="N10,000"
        subHeading="james@example.com"
        rightSection="10:00 am"
      />
    </React.Fragment>
  ))
  .add("List Group", () => <ListGroup name="December, 12 2018" />)
  .add("Dialog", () => <Dialog modalIsOpen>Are you sure</Dialog>)
  .add("DetailItem", () => (
    <DetailItem label="Client Email">James Novak</DetailItem>
  ))
  .add("DetailHeader", () => (
    <DetailHeader heading="20000" subHeading={`to james@example.com`} />
  ))
  .add("DialogButton", () => (
    <DialogButton
      dialogText="Are you sure"
      confirmAction={() => {}}
      my={2}
      width={400}
      disabled={false}
      children="Delete"
    />
  ))
  .add("DateFilter", () => (
    <DateFilter
      onSearchChange={() => {}}
      buttonText="This Month"
      searchValue=""
      dateValue={{}}
      onChange={() => {}}
      onFilterChange={() => {}}
      selection={""}
      onKeyDown={() => {}}
      filterOptions={[
        { value: "", label: "Select Filter" },
        { value: "verified", label: "Verified" },
        { value: "not_verified", label: "Not Verified" }
      ]}
      searchButton={{
        display: false,
        onClick: () => {}
      }}
    />
  ))
  .add("SectionListPage", () => (
    <SectionListPage
      data={[
        { name: "Danny Novak", email: "james@example.com", amount: "20000" }
      ]}
      callback={transaction => ({
        // date: transaction.date,
        heading: transaction.name,
        subHeading: transaction.email,
        rightSection: `N${transaction.amount.toLocaleString()}`,
        verified: true
      })}
    />
  ))
  .add("SpinnerContainer", () => <SpinnerContainer condition={true} />)
  .add("PVerificationListItem", () => (
    <PVerificationListItem
      {...{
        heading: "Sample Heading",
        subHeading: "transaction.email",
        rightSection: `N20 000`,
        verified: true
      }}
    />
  ))
  .add("TutorDetailHeader", () => (
    <TutorDetailHeader
      image="https://ca.slack-edge.com/T0HKF4Y2E-U8E5J3UT0-4d4906bb6a86-72"
      detail={[
        "20 years ago",
        "James Novak",
        "james@example.com",
        "08022332233"
      ]}
      children={<div>Id verified</div>}
    />
  ))
  .add("VerificationItem", () => (
    <VerificationItem
      buttons={[
        {
          children: "Approve Manually",
          dialogText: "Are you sure you want to manually approve the email",
          confirmAction: () => {}
        }
      ]}
      label="Email Verification"
    />
  ))
  .add("HomePageSpinner", () => <HomePageSpinner />)
  .add("RequestListItem", () => (
    <RequestListItem
      to="http:/www.google.com"
      {...{
        slug: "ABCDESDDESS",
        full_name: "Shola Ameobi",
        email: "james@example.com",
        phone_no: "08033002232",
        skill: "IELTS",
        tutor: "Chidiebere",
        status: "pending",
        created: "2018-10-12 14:10:33",
        modified: "2018-10-12 14:10:33"
      }}
      children={
        <Flex flexDirection="column">
          <Text fontWeight="bold">Remarks</Text>
          <Text>Sent a message to the client to approve lessons</Text>
          <Text fontSize="12px">Last Updated: 20/10/2018</Text>
        </Flex>
      }
    />
  ));
