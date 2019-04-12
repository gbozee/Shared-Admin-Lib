/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useContext } from "react";
import { Flex } from "@rebass/emotion";
import { Link } from "react-router-dom";
import { DateFilter } from "../shared/DateFilter";
import { FormDrawer } from "../shared/components";
import { SpinnerContainer } from "../shared/primitives/Spinner";
import { SectionListPage } from "../shared/reusables";
import { useState, useEffect } from "react";
import { Button } from "../shared/primitives";
import { useSalesHook, useLoadData } from "./hooks";
import { GroupBookingCreateForm } from "../components/sales";
import { GroupBookingListItem } from "../components/sales/details";

import { DataContext } from "../shared/DataContext";

const RegularRequestListPage = ({
  location,
  detailPageUrl = () => {},
  goToList
}) => {
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
  let { dispatch, actions } = useContext(DataContext);
  const loadData = () =>
    dispatch({ type: actions.LOAD_GROUP_LESSONS, value: state });

  let [bookingRecord, bookingActions] = useLoadData({ fetchData: loadData });
  let [showModal, setShowModal] = useState(state.displayModal);
  let [bookingInfo, setBookingInfo] = useState({});
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
    dispatch({
      type: actions.CREATE_GROUP_BOOKING,
      value: { tutors, data }
    }).then(result => {
      bookingActions.setData([...bookingRecord.data, result]);
      setShowModal(false);
      console.log(data);
    });
  };
  return (
    <Flex flexDirection="column">
      <Flex justifyContent="flex-end">
        <FormDrawer
          heading="Group Booking"
          isOpen={showModal}
          onClose={() => {
            setBookingInfo({});
            setShowModal(false);
          }}
        >
          <Link to={`/bookings/group/${bookingInfo.order}`}>
            <Button
              bg="transparent"
              color={"blue"}
              px={0}
              onClick={goToList}
              mb={3}
            >
              Go to class list
            </Button>
          </Link>
          <GroupBookingCreateForm
            skills={["IELTS"]}
            tutors={tutors}
            initialValues={bookingInfo}
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
          onChange={onDateFilter}
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
          <Button
            py="0"
            css={css`
              height: 32px;
            `}
            onClick={() => setShowModal(true)}
          >
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
              onClick: e => {
                e.preventDefault();
                setBookingInfo(request);
                setShowModal(true);
              }
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
