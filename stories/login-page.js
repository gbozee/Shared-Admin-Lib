/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/core';
import { Box, Flex, Text, Link, Heading, Image } from '@rebass/emotion';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import LoginPage from '../src/shared/LoginPage';
import {
  ListItem,
  ListGroup,
  DetailHeader,
  SectionListPage,
  DetailItem,
  PVerificationListItem,
  TutorDetailHeader,
  RequestDetailHeader,
  VerificationItem,
  RequestListItem,
  BookingDetailHeader,
  BookingListItem,
  SubjectDetailView,
  SessionListItem,
  RatingComponent,
  SummaryCardList,
  getDate,
} from '../src/shared/reusables';
import { DateFilter } from '../src/shared/DateFilter';
import {
  SpinnerContainer,
  HomePageSpinner,
} from '../src/shared/primitives/Spinner';
import { DialogButton, Button } from '../src/shared/primitives';
import DataProvider, {
  ProtectedRoute,
  DataContext,
} from '../src/shared/DataProvider';
import { Dialog, ModalButton } from '../src/shared/primitives/Modal';
import {
  FormDrawer,
  RequestForm,
  BookingForm,
  CardItem,
} from '../src/shared/components';

storiesOf('Pages', module).add('Login Page', () => (
  <LoginPage
    login={() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // resolve();
          reject({ data: 'The credentials is invalid' });
        }, 2000);
      });
    }}
    toNextPage={() => {}}
  />
));

let Components = storiesOf('Components', module);
Components.add('ListItem', () => (
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
  .add('List Group', () => <ListGroup name="December, 12 2018" />)
  .add('Dialog', () => <Dialog modalIsOpen>Are you sure</Dialog>)
  .add('DetailItem', () => (
    <DetailItem label="Client Email">James Novak</DetailItem>
  ))
  .add('DetailHeader', () => (
    <DetailHeader heading="20000" subHeading={`to james@example.com`} />
  ))
  .add('DialogButton', () => (
    <DialogButton
      dialogText="Are you sure"
      confirmAction={() => {}}
      my={2}
      width={400}
      disabled={false}
      children="Delete"
    />
  ))
  .add('DateFilter', () => (
    <Flex flexDirection="column">
      <Box mb={3}>
        <DateFilter
          onSearchChange={() => {}}
          buttonText="This Month"
          searchValue=""
          dateValue={{}}
          onChange={() => {}}
          onFilterChange={() => {}}
          selection={''}
          onKeyDown={() => {}}
          filterOptions={[
            { value: '', label: 'Select Filter' },
            { value: 'verified', label: 'Verified' },
            { value: 'not_verified', label: 'Not Verified' },
          ]}
          searchButton={{
            display: false,
            onClick: () => {},
          }}
        />
      </Box>
      <Box>
        <DateFilter
          onSearchChange={() => {}}
          buttonText="This Month"
          searchValue=""
          dateValue={{}}
          onChange={() => {}}
          onFilterChange={() => {}}
          selection={''}
          onKeyDown={() => {}}
          // filterOptions={[
          //   { value: "", label: "Select Filter" },
          //   { value: "verified", label: "Verified" },
          //   { value: "not_verified", label: "Not Verified" }
          // ]}
          searchButton={{
            display: false,
            onClick: () => {},
          }}
          filters={[
            {
              name: 'Subject',
              selection: '',
              options: [
                { value: '', label: 'Filter by subject' },
                { value: 'Chinese', label: 'Chinese' },
                { value: 'IELTS', label: 'IELTS' },
                { value: 'Academic', label: 'Academic' },
                { value: 'German', label: 'German' },
              ],
            },
            {
              name: 'Class',
              selection: '',
              options: [{ value: '', label: 'Filter by class' }],
            },
            {
              name: 'Status',
              selection: '',
              options: [
                { value: '', label: 'Filter by status' },
                { value: 'Not Paid', label: 'Not Paid' },
                { value: 'Paid Full', label: 'Paid Full' },
                { value: 'Paid Half', label: 'Paid Half' },
              ],
            },
          ]}
        />
      </Box>
    </Flex>
  ))

  .add('SectionListPage', () => (
    <SectionListPage
      data={[
        { name: 'Danny Novak', email: 'james@example.com', amount: '20000' },
      ]}
      callback={transaction => ({
        // date: transaction.date,
        heading: transaction.name,
        subHeading: transaction.email,
        rightSection: `N${transaction.amount.toLocaleString()}`,
        verified: true,
      })}
    />
  ))
  .add('SpinnerContainer', () => <SpinnerContainer condition={true} />)
  .add('PVerificationListItem', () => (
    <PVerificationListItem
      {...{
        heading: 'Sample Heading',
        subHeading: 'transaction.email',
        rightSection: `N20 000`,
        verified: true,
      }}
    />
  ))
  .add('TutorDetailHeader', () => (
    <TutorDetailHeader
      image="https://ca.slack-edge.com/T0HKF4Y2E-U8E5J3UT0-4d4906bb6a86-72"
      detail={[
        '20 years ago',
        'James Novak',
        'james@example.com',
        '08022332233',
      ]}
      frozen
      unFreezeProfile={() => {}}
      children={<div>Id verified</div>}
    />
  ))
  .add('RequestDetailHeader', () => (
    <RequestDetailHeader
      request={{
        user: {
          full_name: 'Tioluwani Kolawole',
          email: 'kolawole.tioluwani@gmail.com',
          phone: '08078657912',
        },
        request_id: '23009',
        no_of_hours: 7,
        per_hour_rate: 2500,
        budget: 35000,
        slug: 'ABSCDEFG',
        address: '105 igi olugbin street',
        vicinity: 'Bariga',
        state: 'Lagos',
        start_date: '2018-10-10 9:20:33',
        start_time: '9:20:33',
        no_of_students: 3,
        status: 'ISSUED',
        curriculum: 'British',
        duration: '3pm - 5pm',
        classes: ['JSS1', 'JSS2', 'SS1'],
        days: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
        subjects: ['Mathematics', 'English Language', 'Biology', 'Chemistry'],
        expectation:
          'Lorem Khaled Ipsum is a major key to success. I’m giving you cloth talk, cloth. Special cloth alert, cut from a special cloth. The first of the month is coming, we have to get money, we have no choice.',
      }}
      isOpen={true}
    />
  ))
  .add('VerificationItem', () => (
    <VerificationItem
      buttons={[
        {
          children: 'Approve Manually',
          dialogText: 'Are you sure you want to manually approve the email',
          confirmAction: () => {},
        },
      ]}
      label="Email Verification"
    />
  ))
  .add('HomePageSpinner', () => <HomePageSpinner />)
  .add('RequestListItem', () => (
    <Box>
      <Box>
        <RequestListItem
          to="http:/www.google.com"
          {...{
            slug: 'ABCDESDDESS',
            full_name: 'Shola Ameobi',
            email: 'james@example.com',
            phone_no: '08033002232',
            budget: 4000,
            skill: 'IELTS',
            tutor: 'Chidiebere',
            status: 'pending',
            created: '2018-10-12 14:10:33',
            modified: '2018-10-12 14:10:33',
          }}
          children={
            <Flex flexDirection="column">
              <Text fontWeight="bold">Remarks</Text>
              <Text>Sent a message to the client to approve lessons</Text>
              <Text fontSize="12px">Last Updated: 20/10/2018</Text>
            </Flex>
          }
        />
      </Box>

      <Box>
        <RequestListItem
          to="http:/www.google.com"
          {...{
            slug: 'ABCDESDDESS',
            full_name: 'Shola Ameobi',
            email: 'james@example.com',
            phone_no: '08033002232',
            no_of_students: 5,
            request_type: 'group',
            budget: 4000,
            skill: 'IELTS',
            tutor: 'Chidiebere',
            status: 'pending',
            created: '2018-10-12 14:10:33',
            modified: '2018-10-12 14:10:33',
            rightBottom: getDate('2018-10-12 14:10:33'),
            // rightBottom: "January Standard Class"
          }}
        />
      </Box>
    </Box>
  ));
let booking_item = {
  user: { full_name: 'Mrs Ego', email: 'ego@example.com' },
  tutor: {
    full_name: 'Jamie novako',
    email: 'jamie@example.com',
  },
  percentage_split: 75,
  skill_name: 'English Language',
  status: 'DELIVERED',
  first_session: '2018-10-12 14:10:33',
  last_session: '2018-10-12 14:10:33',
  total_price: 20000,
  hijack_tutor_link: 'http://www.google.com',
  hijack_client_link: 'http://www.google.com',
  order: 'AABBDDESEES',
};
Components.add('BookingDetailHeader', () => (
  <BookingDetailHeader {...booking_item} />
)).add('BookingListItem', () => <BookingListItem {...booking_item} />);

const SubjectListItemComponent = ({ name, to }) => (
  <Link
    href={to}
    css={css`
      display: block;
      border-bottom: 1px solid black;
      padding-top: 15px;
      padding-bottom: 15px;
    `}
  >
    {name}
  </Link>
);
Components.add('SubjectStatusListView', () => (
  <SectionListPage
    data={[
      { skill_name: 'English', status: 'active' },
      { skill_name: 'Chemistry', status: 'denied' },
      { skill_name: 'Yoruba', status: 'pending' },
      { skill_name: 'French', status: 'active' },
      { skill_name: 'Accounting', status: 'modification' },
      { skill_name: 'Hausa', status: 'denied' },
      { skill_name: 'Physics', status: 'modification' },
    ]}
    callback={skill => ({
      name: skill.skill_name,
      to: skill.status !== 'denied' && 'http://www.google.com',
    })}
    funcGetter={item => item.status}
    Component={SubjectListItemComponent}
    orderFunc={(a, b) => {
      if (a.status < b.status) return -1;
      if (a.status > b.status) return 1;
      return 0;
    }}
    keyIndex="skill_name"
  />
));
Components.add('SubjectDetailView', () => (
  <SubjectDetailView
    {...{
      skill: {
        name: 'English Language',
      },
      heading:
        'I have the gadgets and tutoring skills, passing is the only option',
      description: `Listening, writing and speaking are basic abilities one must possess as it is used daily to communicate locally but how well have you mastered these skills especially in a foreign environment? 
I would start by introducing you to various aspects of English speakers on an audio headphone as well as identifying such pronunciations, word for word within time and quicker response time
I would introduce you to newer ways to skim and scan as well as summarize at the same time(multitasking)
Also we would demystify the common errors people make thus giving you an edge for the exams
We would also cover quicker ways to write within time and expose you to academic materials as well as past questions of old ielts exams`,
      quiz: {
        score: 40,
        pass_mark: 50,
      },
      link: 'http://www.google.com',
      status: 'active',
      price: 2000,
      location: 'gwarinpa, Abuja',
      stats: {
        hours_taught: 31,
        active_bookings: 0,
      },
    }}
  />
));

Components.add('SessionListItem', () => (
  <SessionListItem
    {...{
      order: 'AABBDDESAAS',
      price: 'N3500',
      date: '2018-10-10 9:20:33',
      status: 'completed',
      no_of_hours: 4,
      onEdit: () => {},
    }}
  />
));

Components.add('Rating Component', () => <RatingComponent rating={4} />);
Components.add('SummaryCardList', () => (
  <SummaryCardList
    items={[
      {
        name: 'Paid Requests',
        amount: 200000,
        count: 3,
        count_text: 'Request count',
      },
      {
        name: 'Pending Requests',
        amount: 500000,
        count: 30,
        count_text: 'Request count',
      },
      { name: 'Total Revenue from lessons', amount: 400000, count: 25 },
      { name: 'Combined Revenue', amount: 100000, count: 200 },
    ]}
  />
))
  .add('Request form', () => <RequestForm initialValues={{first_name: 'Tioluwani', last_name: 'Kolawole', days: ['Monday']}}/>)
  .add('Booking form', () => <BookingForm />)
  .add('Booking Form In Drawer', () => (
    <FormDrawer heading="Booking">
      <BookingForm
        fields={{ client: 'test.tioluwani@gmail.com' }}
        onSubmit={values => console.log(values)}
      />
    </FormDrawer>
  ))
  .add('Request Form In Drawer', () => (
    <FormDrawer>
      <RequestForm
        fields={{
          first_name: 'Tioluwani',
          last_name: 'Kolawole',
          email: 'kolawole8tiolu@gmail.com',
          phone: '08078657912',
          no_of_children: '2',
          status: 'pending',
          no_of_days: 5,
          gender: 'male',
          how_you_heard: '0',
          request_type: 'regular request',
          curriculum: 'nigerian',
          hours: '1.5',
          address: '32 Alara street, Onike',
          state: 'Lagos',
          vicinity: 'Yaba',
          expectation: 'expectation',
          budget: '35000',
          classes: [],
          subjects: ['English', 'Mathematics'],
          days: ['Monday'],
        }}
        onSubmit={values => console.log(values)}
      />
    </FormDrawer>
  ));
Components.add('Card Item', () => (
  <CardItem>{onCancel => <BookingForm onCancel={onCancel} />}</CardItem>
));
