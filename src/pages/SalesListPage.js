/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Flex } from "@rebass/emotion";
import { DateFilter } from "../shared/DateFilter";
import Link from "react-router-dom/Link";
import { FormDrawer, RequestForm } from "../shared/components";
import { SpinnerContainer } from "../shared/primitives/Spinner";
import {
  RequestListItem,
  SectionListPage,
  SummaryCardList,
  GroupLessonListItem,
  getDate
} from "../shared/reusables";
import { useState } from "react";
import { Button } from "../shared/primitives";
import { useSalesHook } from "./hooks";

export const GroupLessonListPage = ({ location, detailPageUrl }) => {
  let {
    state,
    actions: { setSearchParam, setDateFilter, setSelection, serverSearch }
  } = useSalesHook(location);
  const filteredResults = () => {
    return [
      {
        slug: "ABCDESDDESS",
        full_name: "Shola Ameobi",
        email: "james@example.com",
        phone_no: "08033002232",
        budget: 40000,
        no_of_students: 5,
        skill: "IELTS",
        tutor: "Chidiebere",
        status: "pending",
        created: "2018-10-12 14:10:33",
        modified: "2018-10-12 14:10:33",
        type: "January Standard Class",
        duration: "10am - 2pm",
        location: "Gbagada",
        start_date:
          "Sat Mar 23 2019 00:00:00 GMT+0100 (West Africa Standard Time)",
        end_date:
          "Sun Apr 14 2019 00:00:00 GMT+0100 (West Africa Standard Time)"
      },
      {
        slug: "ABCDESDEES1",
        full_name: "Dele Alli",
        email: "dele.alli@example.com",
        phone_no: "08033002132",
        budget: 10000,
        no_of_students: 8,
        skill: "IELTS",
        tutor: "Chidiebere",
        status: "pending",
        created: "2018-10-12 14:10:33",
        modified: "2018-10-12 14:10:33",
        type: "January Standard Class",
        duration: "10am - 2pm",
        location: "Gbagada",
        start_date:
          "Wed Apr 24 2019 00:00:00 GMT+0100 (West Africa Standard Time)",
        end_date:
          "Wed June 19 2019 00:00:00 GMT+0100 (West Africa Standard Time)"
      },
      {
        slug: "ABCDESDEES1",
        full_name: "Harry Kane",
        email: "harrykane@example.com",
        phone_no: "08078654412",
        budget: 1000,
        no_of_students: 18,
        skill: "IELTS",
        tutor: "Chidiebere",
        status: "pending",
        created: "2018-10-12 14:10:33",
        modified: "2018-10-12 14:10:33",
        type: "January Standard Class",
        duration: "10am - 2pm",
        location: "Gbagada",
        start_date:
          "Wed Apr 24 2019 00:00:00 GMT+0100 (West Africa Standard Time)",
        end_date:
          "Wed June 19 2019 00:00:00 GMT+0100 (West Africa Standard Time)"
      }
    ];
  };
  const onSearch = () => {};
  const actions = {
    ISSUED: 1,
    COMPLETED: 2,
    PENDING: 4,
    MEETING: 5,
    BOOKED: 6,
    PAYED: 3,
    COLD: 8,
    TO_BE_BOOKED: 11
  };
  return (
    <Flex flexDirection="column">
      <SummaryCardList
        items={[
          {
            name: "Paid Requests",
            amount: 200000,
            count: 3,
            count_text: "Request count"
          },
          {
            name: "Pending Requests",
            amount: 500000,
            count: 30,
            count_text: "Request count"
          },
          { name: "Total Revenue from lessons", amount: 400000, count: 25 }
        ]}
      />
      <Flex flexDirection={"column"}>
        <DateFilter
          onSearchChange={e => {
            setSearchParam(e.target.value);
          }}
          buttonText="This Month"
          searchValue={state.searchParam}
          dateValue={state.dateFilter}
          onChange={setDateFilter}
          onKeyDown={serverSearch}
          displayDate={false}
          selection={state.selection}
          onFilterChange={e => setSelection(e.target.value)}
          placeholder="Search by email"
          searchButton={{
            display: true,
            onClick: serverSearch
          }}
          filters={[
            {
              name: "Subject",
              selection: "",
              options: [
                { value: "", label: "Filter by subject" },
                { value: "Chinese", label: "Chinese" },
                { value: "IELTS", label: "IELTS" },
                { value: "Academic", label: "Academic" },
                { value: "German", label: "German" }
              ]
            },
            {
              name: "Class",
              selection: "",
              options: [{ value: "", label: "Filter by class" }]
            },
            {
              name: "Status",
              selection: "",
              options: [
                { value: "", label: "Filter by status" },
                { value: "Not Paid", label: "Not Paid" },
                { value: "Paid Full", label: "Paid Full" },
                { value: "Paid Half", label: "Paid Half" }
              ]
            }
          ]}
        />
      </Flex>
      <SpinnerContainer condition={state.loading}>
        <Flex flexDirection="column">
          <SectionListPage
            data={filteredResults()}
            callback={request => ({
              ...request,
              to: detailPageUrl(request.slug),
              request_type: "group",
              rightBottom: getDate(request.created)
            })}
            LinkComponent={Link}
            Component={GroupLessonListItem}
            keyValue="start_date"
            funcGetter={item =>
              `${item.type} (${getDate(item.start_date)} - ${getDate(
                item.end_date
              )})`
            }
            orderFunc={(a, b) =>
              new Date(b.start_date).getTime() -
              new Date(a.start_date).getTime()
            }
          />
        </Flex>
      </SpinnerContainer>
    </Flex>
  );
};

const RegularRequestListPage = ({ location, detailPageUrl }) => {
  let {
    state,
    actions: { setSearchParam, setDateFilter, setSelection, serverSearch }
  } = useSalesHook(location);
  let [showModal, setShowModal] = useState(false);
  const onDateFilter = ({ from, to }) => {
    setDateFilter({ from, to });
  };
  const filteredResults = () => {
    return [
      {
        slug: "ABCDESDDESS",
        full_name: "Shola Ameobi",
        email: "james@example.com",
        phone_no: "08033002232",
        skill: "IELTS",
        budget: 20000,
        tutor: "Chidiebere",
        status: "pending",
        created: "2018-10-12 14:10:33",
        modified: "2018-10-12 14:10:33"
      }
    ];
  };
  const onSearch = () => {};
  const actions = {
    ISSUED: 1,
    COMPLETED: 2,
    PENDING: 4,
    MEETING: 5,
    BOOKED: 6,
    PAYED: 3,
    COLD: 8,
    TO_BE_BOOKED: 11
  };
  return (
    <Flex flexDirection="column">
      <SummaryCardList
        items={[
          {
            name: "Paid Requests",
            amount: 200000,
            count: 3,
            count_text: "Request count"
          },
          {
            name: "Pending Requests",
            amount: 500000,
            count: 30,
            count_text: "Request count"
          },
          { name: "Total Revenue from lessons", amount: 400000, count: 25 },
          { name: "Combined Revenue", amount: 100000, count: 200 }
        ]}
      />
      <Flex justifyContent="flex-end">
        <Button onClick={() => setShowModal(true)}>New Request</Button>
        <FormDrawer isOpen={showModal} onClose={() => setShowModal(false)}>
          <RequestForm />
        </FormDrawer>
      </Flex>
      <Flex flexDirection={"column"}>
        <DateFilter
          onSearchChange={e => {
            setSearchParam(e.target.value);
          }}
          buttonText="This Month"
          searchValue={state.searchParam}
          dateValue={state.dateFilter}
          onChange={onDateFilter}
          onKeyDown={serverSearch}
          displayDate={false}
          selection={state.selection}
          onFilterChange={e => setSelection(e.target.value)}
          placeholder="Search by email"
          searchButton={{
            display: true,
            onClick: serverSearch
          }}
          filterOptions={[
            { value: "", label: "All" },
            {
              value: actions.ISSUED,
              label: "issued requests"
            },
            {
              value: actions.COMPLETED,
              label: "completed requests"
            },
            {
              value: actions.PENDING,
              label: "pending requests"
            },
            {
              value: actions.MEETING,
              label: "meet with client"
            },
            {
              value: actions.PAYED,
              label: "paid requests"
            },
            {
              value: actions.COLD,
              label: "cold clients"
            },
            {
              value: actions.TO_BE_BOOKED,
              label: "requests to be booked"
            }
          ]}
        />
      </Flex>
      <SpinnerContainer condition={state.loading}>
        <Flex flexDirection="column">
          <SectionListPage
            data={filteredResults()}
            callback={request => ({
              ...request,
              to: detailPageUrl(request.slug)
            })}
            LinkComponent={Link}
            Component={RequestListItem}
            keyValue="created"
          />
        </Flex>
      </SpinnerContainer>
    </Flex>
  );
};

export default RegularRequestListPage;
