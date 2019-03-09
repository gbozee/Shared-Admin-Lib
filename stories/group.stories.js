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
  .add("Group Bookings", () => {
    return <GroupBookingListPage />;
  });
