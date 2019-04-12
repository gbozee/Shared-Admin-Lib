/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Flex } from "@rebass/emotion";
import { DateFilter } from "../shared/DateFilter";
import { Link } from "react-router-dom";
import { FormDrawer, RequestForm, BookingForm } from "../shared/components";
import { SpinnerContainer } from "../shared/primitives/Spinner";
import { SectionListPage, SummaryCardList, getDate } from "../shared/reusables";
import { useState, useEffect, useContext } from "react";
import { Button } from "../shared/primitives";
import { useSalesHook, useLoadData } from "./hooks";
import { RequestItemDetail } from "../components/sales";
import { DataContext } from "../shared/DataContext";
import GroupRequestForm from "../shared/components/GroupRequestForm";

const RegularRequestListPage = ({ location, detailPageUrl }) => {
  let {
    state,
    actions: { setSearchParam, setDateFilter, setSelection, serverSearch }
  } = useSalesHook(location);
  let { dispatch, actions } = useContext(DataContext);
  const loadData = () => dispatch({ type: actions.LOAD_DATA, value: state });
  const loadWorkingData = () =>
    dispatch({ type: actions.LOAD_WORKING_RECORDS });
  const loadRemarks = () => dispatch({ type: actions.LOAD_REMARKS });
  let [requestData, requestActions] = useLoadData({
    fetchData: loadData
  });
  console.log(requestData.data);
  let [workingData, workingDataActions] = useLoadData({
    fetchData: loadWorkingData
  });
  let [groupLessons, groupLessonActions] = useLoadData({
    fetchData: () =>
      dispatch({
        type: actions.LOAD_GROUP_LESSONS,
        value: { status: "active" }
      })
  });
  let [remarkData, remarkActions] = useLoadData({ fetchData: loadRemarks });
  let [showModal, setShowModal] = useState(false);
  let [requestInfo, setRequestInfo] = useState({});
  const onDateFilter = ({ from, to }) => {
    setDateFilter({ from, to });
  };
  useEffect(() => {
    requestActions.refreshList();
  }, [
    state.filter,
    state.selection,
    state.dateFilter.from,
    state.dateFilter.to,
    state.searchParam
  ]);
  useEffect(() => {
    console.log(requestData.data);
  });
  const onSearch = () => {};
  const filteredResult = () => {
    if (state.selection === "working") {
      return requestData.data.filter(x =>
        workingData.data.map(y => y.slug).includes(x.slug)
      );
    }
    return requestData.data;
  };
  const filteredRequests = (condition, value) => {
    let dd = filteredResult().filter(condition);
    if (value === "budget") {
      return dd.map(x => x[value]).reduce((a, b) => a + b, 0);
    }
    return dd.length;
  };

  const filtersFromServer = [
    { label: "Pending Requests", value: "pending" },
    { label: "Paid Requests", value: "payed" }
  ];
  const moveToCold = data => {
    dispatch({
      type: actions.CHANGE_STATUS,
      value: { status: "cold", instance: data }
    }).then(response => {
      let newRequestData = requestData.data.filter(x => x.slug !== data.slug);
      console.log(newRequestData);
      requestActions.setData(newRequestData);
    });
  };
  const addClientToGroupClass = (data, params) => {
    dispatch({
      type: actions.CREATE_BOOKING_FOR_CLIENT,
      value: { ...params, instance: data }
    }).then(() => {
      console.log(params);
      let newRequest = requestData.data.map(x => {
        let inst = summary => {
          x.request_info.request_details.schedule.summary = summary;
          return x.request_info;
        };
        return x.slug === data.slug
          ? { ...x, booking: {}, request_info: inst(params.class_text) }
          : x;
      });
      requestActions.setData(newRequest);
    });
  };
  const markRequestAsPayed = data => {
    dispatch({ type: actions.MADE_PAYMENT, value: { instance: data } });
    let newRequestData = requestData.data.map(x =>
      x.slug === data.slug ? { ...x, status: "payed" } : x
    );
    requestActions.setData(newRequestData);
  };
  const updateRemark = (remark, data) => {
    let newRemarks = [...remarkData.data, remark];
    dispatch({
      type: actions.UPDATE_REMARK,
      value: { remarks: newRemarks, remark, instance: data }
    }).then(() => {
      console.log("Save remarks");
    });
    remarkActions.setData(newRemarks);
  };
  const saveRequestInfo = newInfo => {
    const isEdit = Boolean(newInfo.slug);
    console.log(actions.SAVE_REQUEST_INFO);
    dispatch({
      type: actions.SAVE_REQUEST_INFO,
      value: { instance: newInfo, create: !isEdit }
    }).then(data => {
      let newRequestData = isEdit
        ? requestData.data.map(x => (x.slug === data.slug ? data : x))
        : [...requestData.data, data];
      requestActions.setData(newRequestData);
      setRequestInfo({});
      setShowModal(false);
    });
  };
  const transformGroupLessonData = requestInfo => {
    let {
      request_subjects,
      phone_no,
      full_name,
      request_info,
      ...rest
    } = requestInfo;
    let result = rest;
    if (request_subjects && request_subjects.length === 1) {
      result.skill = request_subjects[0];
    }
    if (phone_no) {
      result.number = phone_no;
    }
    if (full_name) {
      let splitFullName = full_name.split(" ");
      result.first_name = splitFullName[0];
      result.last_name = splitFullName[1];
    }
    if (request_info && request_info.request_details) {
      result.schedule = request_info.request_details.schedule.summary;
    }
    if (Object.keys(requestInfo).length == 0) {
      result.skill = "IELTS";
      result.status = "pending";
    }
    return result;
  };
  return (
    <Flex flexDirection="column">
      <SummaryCardList
        items={[
          {
            name: "Paid Requests",
            amount: filteredRequests(x => x.status === "payed", "budget"),
            count: filteredRequests(x => x.status === "paid"),
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
        <FormDrawer
          isOpen={showModal}
          onClose={() => {
            setRequestInfo({});
            setShowModal(false);
          }}
        >
          <GroupRequestForm
            initialValues={transformGroupLessonData(requestInfo)}
            onSubmit={saveRequestInfo}
          />
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
            { value: "", label: "All Requests" },
            { value: "working", label: "Working Sections" }
          ].concat(filtersFromServer)}
        />
      </Flex>
      <SpinnerContainer condition={state.loading}>
        <Flex flexDirection="column">
          <SectionListPage
            data={filteredResult()}
            keyIndex="slug"
            callback={request => ({
              data: {
                ...request,
                onClick: e => {
                  e.preventDefault();
                  setRequestInfo(request);
                  setShowModal(true);
                }
                // Link: Link
              },
              remark: remarkData.data.filter(x => x.slug === request.slug),
              classList: groupLessons.data.map(x => [x.order, x.schedule]),
              actions: {
                move_to_cold: moveToCold,
                add_client_to_group_class: addClientToGroupClass, //part payment and full payment consideration
                mark_request_as_payed: markRequestAsPayed,
                update_remarks: updateRemark
              }
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
