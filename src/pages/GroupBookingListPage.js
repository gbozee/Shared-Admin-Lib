/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Flex } from "@rebass/emotion";
import { DateFilter } from "../shared/DateFilter";
import Link from "react-router-dom/Link";
import { FormDrawer } from "../shared/components";
import { SpinnerContainer } from "../shared/primitives/Spinner";
import { SectionListPage } from "../shared/reusables";
import { useState, useEffect } from "react";
import { Button } from "../shared/primitives";
import { useSalesHook, useLoadData } from "./hooks";
import { GroupBookingCreateForm } from "../components/sales";
import { GroupBookingListItem } from "../components/sales/details";
import { format } from "date-fns";
function generateSlug(slugLength = 12) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < slugLength; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function fetchData(filter) {
  let data = [
    {
      skill: "IELTS",
      no_of_students: 20,
      amount: 200000,
      status: "scheduled",
      schedule: "January Standard Class Ikeja",
      first_session: "2019-01-10",
      last_session: "2019-01-31",
      tutor: { first_name: "Chidiebere" },
      order: "AADDESSDES",
      created: "2019-01-10"
    },
    {
      skill: "IELTS",
      no_of_students: 20,
      amount: 200000,
      status: "completed",
      schedule: "January Weekend Class Ikeja",
      first_session: "2019-01-10",
      last_session: "2019-01-31",
      tutor: { first_name: "Chidiebere" },
      order: generateSlug(),
      created: "2019-01-10"
    },
    {
      skill: "IELTS",
      no_of_students: 20,
      amount: 200000,
      status: "initialized",
      schedule: "January Standard Class Gbagada",
      first_session: "2019-01-10",
      last_session: "2019-01-31",
      tutor: { first_name: "Chidiebere" },
      order: generateSlug(),
      created: "2019-01-10"
    },
    {
      skill: "IELTS",
      no_of_students: 20,
      amount: 200000,
      status: "scheduled",
      schedule: "January Weekend Class Gbagada",
      first_session: "2019-01-10",
      last_session: "2019-01-31",
      tutor: { first_name: "Chidiebere" },
      order: generateSlug(),
      created: "2019-01-01"
    },
    {
      skill: "IELTS",
      no_of_students: 20,
      amount: 200000,
      status: "scheduled",
      schedule: "Febuary Standard Class Ikeja",
      first_session: "2019-01-10",
      last_session: "2019-01-31",
      tutor: { first_name: "Chidiebere" },
      order: generateSlug(),
      created: "2019-02-10"
    }
  ];
  let result = filter ? data.filter(x => x.status === filter) : data;
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

const RegularRequestListPage = ({ location, detailPageUrl = () => {} }) => {
  let {
    state,
    actions: {
      setSearchParam,
      setDateFilter,
      setSelection,
      setFilter,
      serverSearch
    }
  } = useSalesHook(location);
  let [bookingRecord, bookingActions] = useLoadData({
    fetchData: fetchData(state.filter)
  });
  let [showModal, setShowModal] = useState(false);
  let tutors = [{ first_name: "Chidiebere", email: "chidi@example.com" }];
  const onDateFilter = ({ from, to }) => {
    setDateFilter({ from, to });
  };
  useEffect(() => {
    bookingActions.refreshList();
  }, [state.filter]);
  const onFilterChange = value => {
    setFilter(value);
  };
  const onSearch = () => {};
  const onCreateBooking = data => {
    bookingActions.setData([
      ...bookingRecord.data,
      createBooking(tutors, data)
    ]);
    setShowModal(false);
    console.log(data);
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
            tutors={tutors}
            onSubmit={onCreateBooking}
          />
        </FormDrawer>
      </Flex>
      <Flex flexDirection={"column"}>
        <DateFilter
          buttonText="This Month"
          onKeyDown={serverSearch}
          displayDate={false}
          selection={state.filter}
          onFilterChange={e => onFilterChange(e.target.value)}
          placeholder="Search by email"
          filterOptionsLabel={<label>By Status: </label>}
          filterOptions={[
            { value: "", label: "All Bookings" },
            {
              value: "initialized",
              label: "Initialized"
            },
            {
              value: "scheduled",
              label: "Scheduled"
            },
            {
              value: "pending",
              label: "Pending"
            },
            {
              value: "delivered",
              label: "Delivered"
            },
            {
              value: "completed",
              label: "Completed"
            },
            {
              value: "cancelled",
              label: "Cancelled"
            }
          ]}
        >
          <Button mb={10} onClick={() => setShowModal(true)}>
            New Booking
          </Button>
        </DateFilter>
      </Flex>
      <SpinnerContainer condition={bookingRecord.loading}>
        <Flex flexDirection="column">
          <SectionListPage
            data={bookingRecord.data}
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
