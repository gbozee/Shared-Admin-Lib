/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Flex } from "@rebass/emotion";
import { DateFilter } from "../shared/DateFilter";
import Link from "react-router-dom/Link";
import { FormDrawer, RequestForm } from "../shared/components";
import { SpinnerContainer } from "../shared/primitives/Spinner";
import { SectionListPage, SummaryCardList, getDate } from "../shared/reusables";
import { useState } from "react";
import { Button } from "../shared/primitives";
import { useSalesHook } from "./hooks";
import { RequestItemDetail } from "../components/sales";

const RegularRequestListPage = ({ location, detailPageUrl }) => {
  let {
    state,
    actions: { setSearchParam, setDateFilter, setSelection, serverSearch }
  } = useSalesHook(location);
  let [showModal, setShowModal] = useState(false);
  const onDateFilter = ({ from, to }) => {
    setDateFilter({ from, to });
  };
  const requestRemarks = () => {
    let result = [
      {
        slug: "ABCDESDDESS",
        body: "Sent a message to the client to approve lessons",
        updated: "2018-03-09 12:30PM"
      }
    ];
    return result;
  };
  const filteredResults = () => {
    let result = [
      {
        slug: "ABCDESDDESTT",
        full_name: "Shola Ameobi",
        email: "james@example.com",
        phone_no: "08033002232",
        skill: "IELTS",
        budget: 20000,
        request_type: 1,
        tutor: "Chidiebere",
        status: "pending",
        created: "2018-10-12 14:10:33",
        modified: "2018-10-12 14:10:33"
      },
      {
        slug: "ABCDESDDESS",
        first_name: "Shola",
        last_name: "Ameobi",
        email: "james@example.com",
        number: "08033002232",
        budget: 4000,
        request_subjects: ["IELTS"],
        request_type: 5,
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
      {
        slug: "ABCDESDDESO",
        first_name: "Shola",
        last_name: "Ameobi",
        email: "james@example.com",
        number: "08033002232",
        request_type: 5,
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
      }
    ];
    return result;
  };
  const onSearch = () => {};
  const filteredRequests = (condition, value) => {
    let dd = filteredResults().filter(condition);
    if (value === "budget") {
      return dd.map(x => x[value]).reduce((a, b) => a + b, 0);
    }
    return dd.length;
  };
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
            amount: filteredRequests(x => x.status === "payed", "budget"),
            count: filteredRequests(x => x.status === "payed"),
            count_text: "Request count"
          },
          {
            name: "Pending Requests",
            amount: filteredRequests(x => x.status === "pending", "budget"),
            count: filteredRequests(x => x.status === "pending"),
            count_text: "Request count"
          }
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
              data: { ...request, to: detailPageUrl(request.slug), Link: Link },
              remark: requestRemarks().filter(x => x.slug === request.slug)
            })}
            LinkComponent={Link}
            Component={RequestItemDetail}
            keyValue="created"
          />
        </Flex>
      </SpinnerContainer>
    </Flex>
  );
};

export default RegularRequestListPage;
