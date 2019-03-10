/** @jsx jsx */

import React from "react";
import { css, jsx } from "@emotion/core";
import { Box, Flex, Text } from "@rebass/emotion";
import { storiesOf } from "@storybook/react";
import { Form, FormProvider } from "./Form";
import {
  RequestItemDetail,
  RemarkModal,
  AddToGroupClassModal
} from "../src/components/sales";
import GroupBookingListPage from "../src/pages/GroupBookingListPage";
import { ListItem, BaseListItem } from "../src/shared/reusables";
import Table from "../src/shared/components/Table";
let requestData = [
  {
    data: {
      slug: "ABCDESDDESS",
      first_name: "Shola",
      last_name: "Ameobi",
      email: "james@example.com",
      number: "08033002232",
      budget: 4000,
      request_subjects: ["IELTS"],
      tutor: "Chidiebere",
      status: "pending",
      created: "2018-10-12 14:10:33",
      modified: "2018-10-12 14:10:33",
      request_info: {
        request_details: {
          schedule: {
            summary: "March Standard Class -Ikeja"
          }
        }
      }
    },
    remark: {
      body: "Sent a message to the client to approve lessons",
      updated: "2018-03-09 12:30PM"
    }
  },
  {
    data: {
      slug: "ABCDESDDESO",
      first_name: "Shola",
      last_name: "Ameobi",
      email: "james@example.com",
      number: "08033002232",
      budget: 4000,
      request_subjects: ["IELTS"],
      tutor: "Chidiebere",
      status: "payed",
      created: "2018-10-12 14:10:33",
      modified: "2018-10-12 14:10:33",
      request_info: {
        request_details: {
          schedule: {
            summary: "March Standard Class -Ikeja"
          }
        }
      }
    },
    remark: {
      body: "Sent a message to the client to approve lessons",
      updated: "2018-03-09 12:30PM"
    }
  },
  {
    data: {
      slug: "ABCDESDDESD",
      first_name: "Shola",
      last_name: "Ameobi",
      email: "james@example.com",
      number: "08033002232",
      budget: 4000,
      request_subjects: ["IELTS"],
      tutor: "Chidiebere",
      status: "payed",
      created: "2018-10-12 14:10:33",
      modified: "2018-10-12 14:10:33",
      request_info: {
        request_details: {
          schedule: {
            summary: "March Standard Class -Ikeja"
          }
        }
      },
      booking: {}
    },
    remark: {
      body: "Sent a message to the client to approve lessons",
      updated: "2018-03-09 12:30PM"
    }
  }
];
let actions = {
  move_to_cold: () => {},
  add_client_to_group_class: () => {}, //part payment and full payment consideration
  mark_request_as_payed: () => {}
};
storiesOf("Group Lesson Components", module)
  .add("List Item Component (Pending)", () => (
    <>
      {requestData.map(dd => (
        <RequestItemDetail
          key={dd.data.slug}
          type="group"
          actions={actions}
          remark={dd.remark}
          data={dd.data}
        />
      ))}
    </>
  ))
  .add("Add to Group Class Prompt", () => <AddToGroupClassModal />)
  .add("GroupClass ListItem", () => {
    return (
      <BaseListItem
        to="http://www.google.com"
        leftTop="Jan 10 2019 - Jan 31 2019"
        heading="January Standard Class Ikeja"
        subHeading="Tutor: Chidiebere"
        rightSection={(200000).toLocaleString()}
        rightTop="20 students"
        rightBottom={<Text>Skill: IELTS</Text>}
      />
    );
  })
  .add("Group Class Detail", () => {
    const customer_columns = [
      {
        Header: "Full name",
        accessor: "name",
        Cell: ({ original: { name } }) => <Text>{name}</Text>
      },
      {
        Header: props => {
          console.log(props);
          return "Email";
        },
        accessor: "email",
        Cell: ({ value }) => <span className="number">{value}</span>
      },
      {
        Header: "Phone",
        accessor: "phone"
      },
      {
        Header: "Full Payment",
        accessor: "full_payment",
        Cell: ({ value }) => <Text>{value && `✔`}</Text>
      }
    ];
    let data = [
      {
        name: "Jessica Jones",
        email: "jessicajones@gmail.com",
        phone: "(234) 818 390 8489",
        full_payment: true
      },
      {
        name: "Elizabeth Brown",
        email: "elizabeth-92@example.com",
        phone: "(829) 614 6596",
        full_payment: false
      },
      {
        name: "Maria Bell",
        email: "mariabell@example.com",
        phone: "(355) 509 1978",
        full_payment: true
      }
    ];
    let styling = css`
      align-self: center;
    `;
    return (
      <Box>
        <Table
          adminActions={
            <Flex mb="10px" justifyContent="space-between">
              <Box>
                <label>Action: </label>
                <select
                  css={css`
                    padding-top: 3px;
                    padding-bottom: 3px;
                  `}
                >
                  <option>-------</option>
                  <option>Made full payment</option>
                  <option>Send Curriculum information to clients</option>
                </select>
                <button
                  css={css`
                    margin-left: 10px;
                    padding-top: 3px;
                    padding-bottom: 3px;
                  `}
                >
                  Go
                </button>
              </Box>
              <Text css={styling}>Total Amount: 200000</Text>
              <Text css={styling}>Tutor earns: 50000</Text>
              <button>Pay Tutor</button>
            </Flex>
          }
          data={data}
          columns={customer_columns}
          keyField="email"
        />
      </Box>
    );
  })
  .add("Group Bookings", () => {
    return <GroupBookingListPage />;
  });
