/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Flex } from "@rebass/emotion";
import { DateFilter } from "../shared/DateFilter";
import Link from "react-router-dom/Link";
import { FormDrawer } from "../shared/components";
import { SpinnerContainer } from "../shared/primitives/Spinner";
import { SectionListPage } from "../shared/reusables";
import { useState } from "react";
import { Button } from "../shared/primitives";
import { useSalesHook } from "./hooks";
import { GroupBookingCreateForm } from "../components/sales";
import { GroupBookingListItem } from "../components/sales/details";

const RegularRequestListPage = ({ location, detailPageUrl = () => {} }) => {
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
        skill: "IELTS",
        no_of_students: 20,
        amount: 200000,
        schedule: "January Standard Class Ikeja",
        first_session: "2019-01-10",
        last_session: "2019-01-31",
        tutor: { first_name: "Chidiebere" },
        order: "AADDESSDES",
        created: "2019-01-10"
      }
    ];
  };
  const onSearch = () => {};
  const onCreateBooking = data => {
    console.log(data);
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
      <Flex justifyContent="flex-end">
        <FormDrawer
          heading="Group Booking"
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        >
          <GroupBookingCreateForm
            skills={["IELTS"]}
            tutors={[{ name: "Chidiebere", email: "chidi@example.com" }]}
            onSubmit={onCreateBooking}
          />
        </FormDrawer>
      </Flex>
      <Flex flexDirection={"column"}>
        <DateFilter
          buttonText="This Month"
          onKeyDown={serverSearch}
          displayDate={false}
          selection={state.selection}
          onFilterChange={e => setSelection(e.target.value)}
          placeholder="Search by email"
          filterOptions={[
            { value: "", label: "All Bookings" },
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
        >
          <Button mb={10} onClick={() => setShowModal(true)}>
            New Booking
          </Button>
        </DateFilter>
      </Flex>
      <SpinnerContainer condition={state.loading}>
        <Flex flexDirection="column">
          <SectionListPage
            data={filteredResults()}
            callback={request => ({
              ...request,
              to: detailPageUrl(request.order)
            })}
            LinkComponent={Link}
            Component={GroupBookingListItem}
            keyValue="created"
          />
        </Flex>
      </SpinnerContainer>
    </Flex>
  );
};

export default RegularRequestListPage;
