/** @jsx jsx */

import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { css, jsx } from "@emotion/core";
import { Box, Flex, Text } from "@rebass/emotion";
import { storiesOf } from "@storybook/react";
import { linkTo } from '@storybook/addon-links'
import {
  RequestItemDetail,
  RemarkModal,
  AddToGroupClassModal,
  GroupBookingCreateForm
} from "../src/components/sales";
import GroupBookingListPage from "../src/pages/GroupBookingListPage";
import { ListItem, BaseListItem } from "../src/shared/reusables";
import Table from "../src/shared/components/Table";
import {
  GroupBookingListItem,
  GroupBookingDetailClientTable
} from "../src/components/sales/details";
import { Form } from "../src/shared/components/FormComponent";
import {
  requestData,
  requestLoadingData,
  groupBookingList,
  generateSlug
} from "./adapters/story_data";
import RegularRequestListPage, {
  GroupLessonListPage
} from "../src/pages/SalesListPage";
import { DataContext } from "../src/shared/DataContext";
import Application from "../src/shared/application";
import { format } from "date-fns";
import GroupBookingDetailPage from "../src/pages/GroupBookingDetailPage";
function useContext() {
  function workingRecords() {
    return new Promise(resolve => resolve([{ slug: "ABCDESDDESS" }]));
  }
  function fetchData({ filter, searchParam, selection, dateFilter }) {
    console.log({ selection, dateFilter, searchParam });
    let result = requestLoadingData;
    if (searchParam) {
      result = result.filter(
        x =>
          x.email.toLowerCase().includes(searchParam.toLowerCase()) ||
          x.slug.toLowerCase().includes(searchParam.toLowerCase())
      );
    }
    if (selection && selection !== "working") {
      result = result.filter(x => x.status === selection);
    }
    if (dateFilter && dateFilter.from && dateFilter.to) {
      result = result.filter(x => {
        let recordAsDate = new Date(x.created).getTime();
        let fromDate = new Date(dateFilter.from).getTime();
        let toDate = new Date(dateFilter.to).getTime();
        return recordAsDate >= fromDate && recordAsDate <= toDate;
      });
    }

    return () => new Promise(resolve => resolve(result));
  }

  function createBooking(tutors, data) {
    return {
      schedule: data.display_name,
      first_session: data.first_session,
      last_session: data.last_session,
      skill: data.skill,
      no_of_students: 0,
      amount: 0,
      status: "initialized",
      tutor: tutors.find(x => x.email === data.tutor),
      order: generateSlug(),
      created: format(new Date(), "YYYY-MM-DD")
    };
  }
  function fetchGroupBookingData({ filter }) {
    let data = groupBookingList;
    let result = filter ? data.filter(x => x.status === filter) : data;
    return () => new Promise(resolve => resolve(result));
  }

  function fetchRemark() {
    let result = [
      {
        slug: "ABCDESDDESS",
        body: "Sent a message to the client to approve lessons",
        updated: "2018-03-09 12:30PM"
      }
    ];
    return new Promise(resolve => resolve(result));
  }
  const ACTIONS = {
    LOAD_DATA: "LOAD_DATA",
    LOAD_GROUP_LESSONS: "LOAD_GROUP_LESSONS",
    CREATE_GROUP_BOOKING: "CREATE_GROUP_BOOKING",
    LOAD_REMARKS: "LOAD_REMARKS",
    CHANGE_STATUS: "CHANGE_STATUS",
    ADD_TO_CLASS: "ADD_TO_CLASS",
    UPDATE_REMARK: "UPDATE_REMARK",
    LOAD_GROUP_DETAIL_CLIENTS: "LOAD_GROUP_DETAIL_CLIENTS",
    BOOKING_DETAIL: "BOOKING_DETAIL"
  };
  const dispatchData = ({ type, value }) => {
    if (type === ACTIONS.LOAD_DATA) {
      return fetchData(value)();
    }
    if (type == ACTIONS.LOAD_REMARKS) {
      return fetchRemark();
    }
    if (type == ACTIONS.LOAD_WORKING_RECORDS) {
      return workingRecords();
    }
    if (type == ACTIONS.LOAD_GROUP_LESSONS) {
      return fetchGroupBookingData(value)();
    }
    if (type == ACTIONS.CREATE_GROUP_BOOKING) {
      return new Promise(resolve =>
        resolve(createBooking(value.tutors, value.data))
      );
    }
    if (type == ACTIONS.BOOKING_DETAIL) {
      return new Promise(resolve =>
        resolve({
          status: "scheduled",
          amount: 200000,
          percent_split: 15
        })
      );
    }
    if (type == ACTIONS.LOAD_GROUP_DETAIL_CLIENTS) {
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
      return new Promise(resolve => resolve(data));
    }
    return new Promise(resolve => resolve());
  };
  return { dispatch: dispatchData, actions: ACTIONS, state: {} };
}
const DataProvider = ({ children }) => {
  const localData = useContext();
  return (
    <Application>
      <DataContext.Provider value={localData}>{children}</DataContext.Provider>
    </Application>
  );
};
let actions = {
  move_to_cold: () => {},
  add_client_to_group_class: () => {}, //part payment and full payment consideration
  mark_request_as_payed: () => {}
};
storiesOf("Group Lesson Components", module)
  .add("List Item Component (Pending)", () => (
    <>
      {requestData
        .map(x => ({ ...x, data: { ...x.data, request_type: 5 } }))
        .map(dd => (
          <Application>
            <RequestItemDetail
              key={dd.data.slug}
              type="group"
              actions={actions}
              remark={dd.remark}
              data={dd.data}
            />
          </Application>
        ))}
    </>
  ))
  .add("Add to Group Class Prompt", () => <AddToGroupClassModal />)
  .add("GroupClass ListItem", () => {
    return (
      <Application>
        <GroupBookingListItem
          {...{
            skill: "IELTS",
            no_of_students: 20,
            amount: 200000,
            schedule: "January Standard Class Ikeja",
            first_session: "2019-01-10",
            last_session: "2019-01-31",
            tutor: { first_name: "Chidiebere" },
            order: "AADDESSDES"
          }}
        />
      </Application>
    );
  })
  .add("Group Class Detail", () => {
    return (
      <Application>
        <DataProvider>
          <GroupBookingDetailPage match={{ param: { order: "ABBA" } }} />
        </DataProvider>
      </Application>
    );
  })
  .add("Group Booking CreateForm", () => {
    return (
      <Application>
        <GroupBookingCreateForm
          skills={["IELTS"]}
          tutors={[{ name: "Chidiebere", email: "chidi@example.com" }]}
        />
      </Application>
    );
  })
  .add("Group Bookings List Page", () => {
    return (
      <Router>
        <Application>
          <DataProvider>
            <GroupBookingListPage
              detailPageUrl={slug => slug}
              location={{ search: "?status=initialized&displayModal=true" }}
              goToList={linkTo('Group Lesson Components', 'Group Class Detail')}
            />
          </DataProvider>
        </Application>
      </Router>
    );
  })
  .add("Group Request List Page", () => {
    return (
      <Router>
        <DataProvider>
          <RegularRequestListPage
            location={{ search: "?from=2018-01-01&to=2019-03-14" }}
            detailPageUrl={() => {}}
          />
        </DataProvider>
      </Router>
    );
  });
